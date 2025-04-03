import { HeroSection } from "./hero"
import { Header } from "./header"

export function HomePage() {
    return (
        <div className="w-full h-dvh">
            <Header />
            <main className="w-full flex justify-center">
                <div className="h-[calc(100vh-68px)] flex justify-center">
                    <HeroSection />
                </div>
            </main>
        </div>
    )
}