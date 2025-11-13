import { PokemonData } from "@/app/page";
import Image from "next/image";

const imageStyle = {
  width: '100%',
  height: 'fit',
  margin: '0 auto'
}

export default function Card({ name, imageUrl }: PokemonData) {
  return (
    <div className="aspect-4/5 text-center" style={{ fontFamily: "var(--font-grotesk), var(--font-fallback)" }}>
      <div className="w-full h-full p-4 border rounded-xl border-black bg-[#ffdbb6]">
        <h2 className="text-xl text-[#2b1d0e] mb-2 text-left">{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
        <div className="border border-black rounded-2xl w-full h-fit p-4">
          <Image src={imageUrl} style={imageStyle} height={100} width={100} priority alt={`Image of pokemon ${name}`} />
        </div>
      </div>
    </div>
  );
}