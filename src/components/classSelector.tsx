import * as React from 'react';
import ClassBadge from './classbadge'
import * as en from 'linq'
import { Classes } from '../domain/classes';

interface props {
    isVisible: boolean,
    classWasSelected: (classname: string) => void
}

class ClassSelector extends React.Component<props, {}>{
    render() {
        if (!this.props.isVisible) return null;
        return (
            <div>
                {Classes.map((c, i) => {
                    return (
                        <ClassBadge classname={c.name} key={i} onClick={() => this.props.classWasSelected(c.name)} />
                    )
                })}
            </div>
        )
    }
}

export default ClassSelector