import React from 'react'
import Image from 'next/image'
export default function ServerList() {

    const servers =[
        {
            title: 'Server1',
            image: 'https://www.comassel.com/wp-content/uploads/2021/05/1416404_alert222_script-alert-1-script-1-1.png',
        },
        {
            title: 'Server2',
            image: 'https://play-lh.googleusercontent.com/ZyWNGIfzUyoajtFcD7NhMksHEZh37f-MkHVGr5Yfefa-IX7yj9SMfI82Z7a2wpdKCA=w240-h480-rw',
        },
        {
            title: 'Server3',
            image: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
        },
        {
            title: 'Server3',
            image: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
        },
        {
            title: 'Server3',
            image: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
        },
        {
            title: 'Server3',
            image: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
        },
        {
            title: 'Server3',
            image: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
        },
        {
            title: 'Server3',
            image: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
        },
        {
            title: 'Server3',
            image: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
        },
        {
            title: 'Server3',
            image: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
        },
        {
            title: 'Server3',
            image: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
        },
        
    ]
  return (
    <div className='hideScroll' style={{overflowY: 'auto', height: '560px'}} >
        {servers && servers.map((server) =>(
            <div className='p-1' style={{height: '70px'}}>
                
                <img className='rounded-full object-cover h-full w-full px-1 py-1 cursor-pointer hover:scale-125 '
                src={server.image}
                
                alt={server.name}
                    
                />
            </div>
        ))}
    </div>
  )
}
