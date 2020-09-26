import React from "react"
import { Link } from 'gatsby'
import styles from "./pagination.module.css"

const Pagination = (props) => {

    const isFirst = props.currentPage === 1
    const isLast = props.currentPage === props.numPages
    const prevPage = props.currentPage - 1 === 1 ? props.path : props.path + (props.currentPage - 1)
    const nextPage = props.path + (props.currentPage + 1)

    return (
        <nav className={styles.pager} style={{ display: props.numPages === 1 ? "none" : "block" }}>
            <ul>
                {!isFirst && (
                    <li key="pagination-prev" className={styles.item}>
                        <Link to={prevPage} rel="prev">
                            ← Previous Page
                        </Link>
                    </li>
                )}
                {Array.from({ length: props.numPages }, (_, i) => (
                    <li key={`pagination-number${i + 1}`} className={(i + 1) === props.currentPage ? styles.selected : styles.item}>
                        <Link to={props.path + `${i === 0 ? '' : i + 1}`}>
                            {i + 1}
                        </Link>
                    </li>
                ))}
                {!isLast && (
                    <li key="pagination-next" className={styles.item}>
                        <Link to={nextPage} rel="next">
                            Next Page →
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Pagination