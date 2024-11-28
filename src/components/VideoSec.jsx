import React, { useEffect, useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import { Videos } from "../assets/schemas";

const VideoSec = () => {
    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [popupPlay, setPopupPlay] = useState(true)
    const [selectVideo, setSelectVideo] = useState('')

    const handleClickFooter = (event, id) => {
        event.preventDefault();
        setIsClickedFooter(true);
        setSelectVideo(id)
    };
    const closepopup = (event) => {
        event.preventDefault();
        setIsClickedFooter(false);
    }

    useEffect(() => {
        // for mouse enter and exit
        let video = document.querySelectorAll('.video')

        video.forEach((e) => {
            e.addEventListener('mouseenter', () => {
                e.play()
            })

            e.addEventListener('mouseleave', () => {
                e.pause()
                e.currentTime = 0
            })
        })


        // for initial play
        let popupVideo = document.querySelector('.popup-video video')

        if (isClickedFooter) {
            popupVideo.play()
        }

        // cleanup function
        return () => {
            video.forEach((e) => {
                e.removeEventListener('mouseenter', () => {
                    e.play()
                })

                e.removeEventListener('mouseleave', () => {
                    e.pause()
                    e.currentTime = 0
                })
            })
        }
    }, [isClickedFooter])


    // for pause and play popup video
    const setPopupControl = (event) => {
        const video = event.target
        if (!popupPlay) {
            video.play()
        } else {
            video.pause()
        }
        setPopupPlay(!popupPlay)
    }


    return (
        <div className='video-con-wrapper custom-scroll'>

            {
                Videos?.map((e, i) => {
                    return (
                        <div key={e.id} className='video-con' onClick={(event) => handleClickFooter(event, e.id)}>
                            <video className='video'>
                                <source src={e.link} />
                            </video>
                            <div className='video-info'>
                                <div className='flex end video-btn-play' >
                                    <PlayArrowIcon />
                                </div>
                                <div className='video-product-con'>
                                    <img src="https://cdn.shopify.com/s/files/1/0628/2287/5342/files/how-to-use-image-collagen_480x480.png?v=1723093346" alt="" />

                                    <div className='flexcol g5'>
                                        <div className='text'>{e.name.length >= 30 ? e.name.substring(0, 30) + '...' : e.name} </div>
                                        <div className='price'>{e.price}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

            <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                {isClickedFooter && (
                    <div className="popup">
                        {
                            Videos?.map((e) => {
                                if (e.id == selectVideo) {
                                    return (
                                        <div key={e.id} className='video-con popup-video' >
                                            <video className='video-popup-video' loop onClick={setPopupControl}>
                                                <source src={e.link} />
                                            </video>
                                            <div className='video-info'>
                                                <div className='flex end video-btn-play' onClick={closepopup} >
                                                    <CloseIcon />
                                                </div>
                                                <div className='video-product-con' >
                                                    <img src="https://cdn.shopify.com/s/files/1/0628/2287/5342/files/how-to-use-image-collagen_480x480.png?v=1723093346" alt="" />

                                                    <div className='flexcol g5'>
                                                        <div className='text'>{e.name.length >= 30 ? e.name.substring(0, 30) + '...' : e.name} </div>
                                                        <div className='price'>{e.price}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                )}
            </div>


        </div>
    )
}

export default VideoSec