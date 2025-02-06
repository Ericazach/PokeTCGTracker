import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";

const Pokemon = ({ id, images, ancho }) => {
  return (
    <div>
      <Link href={`/pokemons/${id}`}>
        <CardContainer className={`inter-var py-8 ${ancho}`}>
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-transparent dark:border-white/[0.2] border-black/[0.1] rounded-xl p-2 ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              {/* {name} */}
            </CardItem>

            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src={images.large}
                height="1000"
                width="1000"
                className=" w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
          </CardBody>
        </CardContainer>
      </Link>
    </div>
  );
};

export default Pokemon;
