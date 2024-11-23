import { useRef, useState } from "react"
import Button from "./Button"
import { TiLocationArrow } from "react-icons/ti"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const TOTAL_VIDEOS = 4

const Hero = () => {

  const [currentIndex, setCurrentIndex] = useState(1)
  const [hasClicked, sethasClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedVideos, setLoadedVideos] = useState(0)

  const nextVideoRef = useRef<HTMLVideoElement>(null)

  const handleMiniVideoClick = () => {
    sethasClicked(true)
    setCurrentIndex( prev => {
      return prev % TOTAL_VIDEOS + 1
    })
  }
  const handleVideoLoad = () => {
    setLoadedVideos( prev => prev + 1)
  }

  const getVideoSrc = ( index: number)=> {
    return `videos/hero-${index}.mp4`
  }
  useGSAP(()=>{
    if(hasClicked){
      setIsLoading(true)
      gsap.set("#next-video", {visibility: "visible"})
      gsap.to('#next-video', {
        transformOrigin: "center center",
        scale: 1,
        width: "100%",
        height: "100%",
        duration:1,
        ease: "power1.inOut",
        onStart: () => {nextVideoRef.current!.play()},
      })
    }
    gsap.from("#current-video", {
      transformOrigin: "center center",
      scale: 0,
      duration:1.5,
      border: 0,
      ease: "power1.inOut",

    })
    setIsLoading(false)
  },{dependencies: [currentIndex], revertOnUpdate: true})
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-72">
        <div>
          
          <div className="mask-clip-path absolute-center z-50 size-32  cursor-pointer overflow-hidden rounded-lg">
            <div onClick={handleMiniVideoClick} className="origin-center hover:outline-2 outline-black scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
              {/* Video pequeno que entra haciendo zoom IN currentIndex +1 */}
              <video 
                ref = {nextVideoRef}
                src={getVideoSrc(currentIndex)}
                loop
                muted
                id="current-video"
                className="size-32 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          {/* Video que esta entrando haciendo zoom IN */}
          <video 
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          {/* Video que queda de fondo al clicka */}
          <video 
            src={getVideoSrc(currentIndex === 1 ? TOTAL_VIDEOS : currentIndex - 1)}
            autoPlay
            loop
            muted
            onLoadedData={handleVideoLoad}
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
          <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">{currentIndex}G<b>a</b>ming</h1>
          <div className="absolute left-0 top-0 z-40 size-full">
            <div className="mt-24 px-5 sm:px-10">
              <h1 className="special-font hero-heading text-blue-100">Redefi<b>n</b>e</h1>
              <p className="mb-5 max-w-64 font-robert-regular text-blue-100 ">
                Enter the Metagame Layer <br/>
                Unleash the Play Economy
              </p>
              <Button
                id="watch-trailer"
                title="Watch Trailer"
                leftIcon={<TiLocationArrow />}
                containerClass = "bg-yellow-300 flex-center gap-1"
              />
            </div>
          </div>
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5  text-black">G<b>a</b>ming</h1>
      </div>
    </div>
  )
}

export default Hero