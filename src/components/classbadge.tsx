import * as React from 'react'
import { Classes } from '../domain/classes';
import * as en from 'linq';

interface props {
    classname: string,
    onClick?: () => void,
    hideBorder?: boolean
}
class ClassBadge extends React.Component<props, {}>{
    getImgUrl(): string {
        var img = en.from(Classes).firstOrDefault(x => x.name == this.props.classname);
        if (img) return img.img;
        return "";
    }
    render() {
        return (
            <div onClick={() => this.props.onClick && this.props.onClick()} className={this.props.hideBorder ? "classBadge-noborder" : "classBadge"}>
                <img src={this.getImgUrl()} />
                {this.props.classname}
            </div>
        )
    }
}

export default ClassBadge