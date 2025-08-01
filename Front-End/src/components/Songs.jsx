import { useRef, useState } from "react";

const Songs = ({ songs }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const audioRef = useRef(null);
    const handlePlayPause = (song) => {
        if (currentSong === song && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            if (currentSong !== song) {
                setCurrentSong(song);
                audioRef.current.src = song.audio;
            }
            audioRef.current.play();
            setIsPlaying(true);
        }
    };
    let songsss = songs.map((song) => song)
    return (
        <div className='w-screen mb-0  flex flex-col items-start  min-h-screen px-[4rem]'>
            <h1 className='text-2xl text-white mb-4'>Recommended Songs.{songsss.mood}</h1>
            {songs.map(song => (
                <>
                    <div key={song.id} className='mb-1.5 w-full  shadow-2xl flex items-start justify-between bg-zinc-800 rounded-xs px-3 py-2 hover:bg-zinc-700 transition-colors text-zinc-300'>

                        <div >
                            <h3 className='font-semibold text-white'>{song.title}</h3>
                            <p className='opacity-70'>{song.artist}</p>
                        </div>
                        <div >
                            <button onClick={() => handlePlayPause(song)}>
                                {isPlaying && currentSong === song ? <i className="ri-pause-circle-fill text-2xl"></i> : <i className="ri-play-circle-fill text-2xl"></i>
                                }
                            </button>
                            <audio src={song.audio} ref={audioRef}>
                            </audio>

                        </div>
                    </div>
                </>

            ))}
        </div>
    )
}

export default Songs