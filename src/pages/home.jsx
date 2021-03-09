import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../store/actions/actionUsers'
import { Row, Col, Container, Nav, Navbar } from 'react-bootstrap'
import Pagination from '../components/pagination'
import logo from '../assets/gajianlogo.png'
import styles from '../assets/styles/style.module.css'



export default function Home() {

  const users = useSelector((state) => state.User)
  const [setUserState] = useState([])
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage] = useState(4)
  const [isNextDisabled] = useState(false)
  const [isPrevDisabled] = useState(false)
  const indexOfLastItem = (currentPage * itemPerPage)
  const indexOfFirstItem = (indexOfLastItem - itemPerPage)
  const currentItem = users.slice(indexOfFirstItem, indexOfLastItem)

  function handleNext() {
    if (indexOfLastItem + 1 < users.length) {
      setCurrentPage(currentPage + 1)
    }
  }

  function handlePrev() {
    if (currentPage - 1 !== 0) {
      setCurrentPage(currentPage - 1)
    }
  }


  useEffect(() => {
    dispatch(fetchUser())

    if (users.length > 0) {
      setUserState(users)
    }
  }, [dispatch])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.navbarLeftSide}>
            <div className={styles.logo}>
              Gadjian
            </div>
          </div>
          <div className={styles.navbarRightSide}>
            <div className={styles.greetings}>
              <p>Hello,</p>
              <p className={styles.username}>Gadjian User</p>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.sidebar}>
            <div className={styles.sidebarItemList}>
              <div className={styles.sidebarItem}>
                <div className={styles.sidebarIcon}>X</div>
                <div className={styles.sidebarTitle}>Beranda</div>
              </div>
              <div className={styles.sidebarItem}>
                <div className={styles.sidebarIcon}>X</div>
                <div className={styles.sidebarTitle}>Personnel List</div>
              </div>
              <div className={styles.sidebarItem}>
                <div className={styles.sidebarIcon}>X</div>
                <div className={styles.sidebarTitle}>Daily Attendance</div>
              </div>
            </div>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.personnalTop}>
              <div className={styles.personnalTopLeft}>
                <div className={styles.personnalTxtBesar}>PERSONNEL LIST</div>
                <div className={styles.personnalTxtKecil}>List of all Personnel</div>
              </div>
              <div className={styles.personnalTopRight}>
                <input type="text" placeholder="find personnel" className={styles.inputPersonnal} />
                <button className={styles.addPersonnal}>Add Personnel <svg fill="white" height="12px" viewBox="0 0 469.33333 469.33333"
                  width="12px" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m437.332031 192h-160v-160c0-17.664062-14.335937-32-32-32h-21.332031c-17.664062 0-32 14.335938-32 32v160h-160c-17.664062 0-32 14.335938-32 32v21.332031c0 17.664063 14.335938 32 32 32h160v160c0 17.664063 14.335938 32 32 32h21.332031c17.664063 0 32-14.335937 32-32v-160h160c17.664063 0 32-14.335937 32-32v-21.332031c0-17.664062-14.335937-32-32-32zm0 0" />
                </svg></button>
              </div>
            </div>

            <div className={styles.personnalList}>
              <Pagination users={users} currentItem={currentItem} />
            </div>
            <div className={styles.buttonPagination}>
              <button onClick={() => handlePrev()} disabled={isPrevDisabled}>Previous Page</button>
              <button onClick={() => handleNext()} disabled={isNextDisabled}>Next Page</button>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}