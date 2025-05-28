import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LoaderComponent()
{
    return (
        <div className="h-screen w-full">
            <DotLottieReact loop
                autoplay />
        </div>
    )
}