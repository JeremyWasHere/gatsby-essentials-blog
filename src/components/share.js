import React from "react"
import styles from "./share.module.css"

const Share = (props) => {
    const url = encodeURIComponent(props.url)
    return (
        <div className={styles.shareLinks}>
            If you liked reading this post, please consider using these links to share on <a href={`https://facebook.com/sharer/sharer.php?u=` + url} target="_blank" rel="noreferrer" title="Share on Facebook">Facebook</a> or <a href={`https://twitter.com/intent/tweet?url=` + url} target="_blank" rel="noreferrer" title="Share with Twitter">Twitter</a>.
        </div>
    )
}

export default Share