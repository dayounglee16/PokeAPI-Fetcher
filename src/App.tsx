import axios from "axios";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

const instance = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

interface Pokemon {
  id: number;
  imgURL: string;
  name: string;
}

function App() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        //메인 포켓몬 리스트 (포켓몬 데이터 200개 요청)
        const mainRes = await instance.get("/pokemon", {
          params: {
            limit: 200,
          },
        });
        const result: Pokemon[] = await Promise.all(
          mainRes.data.results.map(async (pokemonItem: { url: string }) => {
            // 포켓몬 상세 데이터 (이미지 불러오기)
            const urlRes = await instance.get(pokemonItem.url);

            //포켓몬 species 데이터 (포켓몬 한글 이름 데이터 불러오기)
            const speciesRes = await instance.get(urlRes.data.species.url);

            //포켓몬 이미지 추출
            const imageURL =
              urlRes.data.sprites.versions["generation-v"]["black-white"]
                .animated["front_default"];

            //포켓몬 한국어 이름 추출
            const koreanName = speciesRes.data.names.find(
              (koreanName: { language: { name: string } }) =>
                koreanName.language.name === "ko"
            );
            //포켓몬 데이터 반환
            return {
              id: urlRes.data.id,
              imgURL: imageURL,
              name: koreanName.name,
            };
          })
        );
        setPokemonData(result);
      } catch (error) {
        console.error("error", error);
        alert("오류를 확인하세요");
      }
    };
    getData();
  }, []);

  return (
    <div className="pokemonBox">
      {pokemonData.map((pokemonItem) => {
        return (
          <div key={pokemonItem.id}>
            <img src={pokemonItem.imgURL} alt={pokemonItem.name} />
            <h3>{pokemonItem.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default App;
