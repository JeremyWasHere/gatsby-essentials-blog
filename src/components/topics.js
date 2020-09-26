import React from "react"
import { Link } from 'gatsby'
import styles from "./topics.module.css"

const Topics = (props) => {
    const topics = props.topics

    return (
        <nav className={styles.topics}>
            Topics: 
            <ul>
                {topics.map((topic) => {
                    const _ = require("lodash")
                    const label = topic
                    const slug = _.kebabCase(topic)

                    return (
                        <li key={slug}>
                            <Link to={"/topic/" + slug} itemProp="url">
                                {label}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Topics