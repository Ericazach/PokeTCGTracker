import Login from "./components/users/login";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      {/* Background Image */}
      <Image 
        src="/assets/images/poke.jpg" 
        alt="bg-poke" 
        layout="fill" // Ensures the image covers the entire container
        objectFit="cover" // Makes the image responsive and covers the viewport
        quality={100} // Optimizes image quality
        className="absolute z-0"
      />

      {/* Login Component */}
      <div className="relative z-10 flex items-start justify-end mx-10 pt-12 h-full">
        <Login />
      </div>
    </div>
  );
}
