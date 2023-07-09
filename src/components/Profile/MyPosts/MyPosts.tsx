import s from './MyPosts.module.css'
export const Profile = () => {
    return <div className={s.content}>
        <div>
            <img src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'/>
        </div>
        <div>ava + decription</div>
        <div>my posts
            <div>new posts
                <div className='posts'>
                    <div className='item'>post 1</div>
                    <div className='item'>post 2</div>
                    <div className='item'>post 3</div>
                </div>
            </div>
        </div>
    </div>
}