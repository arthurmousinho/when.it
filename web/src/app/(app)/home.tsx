import { HeroSection } from "./hero"
import { Header } from "./header"
import { FeaturesSection } from "./features"

export function HomePage() {
    return (
        <div className="w-full h-dvh">
            <Header />
            <main className="flex flex-col justify-center items-center pb-[100px]">
                <div className="h-[calc(100vh-68px)] flex justify-center w-full max-w-[1200px]">
                    <HeroSection />
                </div>
                <div className="max-w-[1200px] w-full">
                    <FeaturesSection />
                </div>
            </main>
        </div>
    )
}