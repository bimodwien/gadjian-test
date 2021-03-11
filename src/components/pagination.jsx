import React from 'react'
import moment from 'moment'
import styles from '../assets/styles/style.module.css'

export default function Pagination({ currentItem }) {

  return (
    currentItem.map((itm, i) => (
      <div className={styles.personnalBox}>
        <div className={styles.personnalListId}>
          <div className={styles.personnalListIdIsi}>
            <div className={styles.personnalListLeft}>
              <div>Personnel ID:</div>
              <div className={styles.personnalId}>123456</div>
            </div>
            <div className={styles.personnalListRight}>...</div>
          </div>
        </div>
        <div className={styles.personnalListContent}>
          <div className={styles.photoContainer}>
            <div className={styles.photo}> <img src={itm.picture.large} alt="..." /></div>
          </div>
          <div className={styles.contentIsi}>
            <b>Name</b>
            <p>{itm.name.first} {itm.name.last}</p>
            <b>Telephone Number</b>
            <p>{itm.phone}</p>
            <b>Birthday</b>
            <p>{moment(itm.dob.date).format('ll')}</p>
            <b>Email</b>
            <p>{itm.email}</p>
          </div>
        </div>
      </div>
    )
    )
  )
}