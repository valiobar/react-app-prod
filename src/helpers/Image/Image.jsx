import React from 'react'
import styles from './Image.css'
class Image extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let src = this.props.src||'';
        if (this.props.src && this.props.imageType){
            let urlOptions = '/c_thumb,w_150,h_150';
           switch (this.props.imageType) {
            case 'card':
                urlOptions = '/w_500,c_scale';
                break;
            case  'gallery':
                urlOptions = '/w_1000,c_scale';

        }
        let lastIndexOf = src.lastIndexOf('/');
        let firsPart =src.slice(0,src.slice(0, lastIndexOf).lastIndexOf('/'))

        src = [firsPart, urlOptions, src.slice(lastIndexOf)].join('');
        console.log(src);
        } else{
            src='';
        }

        return (
            <div className={styles.container}>
                <img src={src} alt=""/>
            </div>
        )
    }
}
export default Image