import React from 'react'

export default function Sqaure(props) {
    return (
        <button className="Square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}
