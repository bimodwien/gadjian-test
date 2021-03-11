import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../store/actions/actionUsers'
import Pagination from '../components/pagination'
import logo from '../assets/gajianlogo.png'
import styles from '../assets/styles/style.module.css'



export default function Home() {

  let users = useSelector((state) => state.User)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage] = useState(4)
  const [isNextDisabled, setIsNextDisable] = useState(false)
  const [isPrevDisabled, setIsPreviousDisable] = useState(false)

  //Filter logic
  const [inputFilter, setInputFilter] = useState({
    personnel: ''
  })
  if (inputFilter) {
    users = users.filter(user => user.name.first.toLowerCase().includes(inputFilter.personnel.toLowerCase()))
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  //Pagination logic
  const indexOfLastItem = (currentPage * itemPerPage)
  const indexOfFirstItem = (indexOfLastItem - itemPerPage)
  const currentItem = users.slice(indexOfFirstItem, indexOfLastItem)
  const lastPage = users.length / itemPerPage

  function handleNext() {
    if (indexOfLastItem + 1 < users.length) {
      setIsNextDisable(false)
      setCurrentPage(currentPage + 1)
    }
  }

  function handlePrev() {
    if (currentPage - 1 !== 0) {
      setIsPreviousDisable(false)
      setCurrentPage(currentPage - 1)
    }
  }

  function handleFindPersonnel(e) {
    setInputFilter({ ...inputFilter, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.navbarLeftSide}>
            <div className={styles.logo}>
              <img src={logo} alt="" />
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
                <div className={styles.sidebarIcon}><i className="fas fa-home"></i></div>
                <div className={styles.sidebarTitle}>Beranda</div>
              </div>
              <div className={styles.sidebarItemActive}>
                <div className={styles.sidebarIcon}><i className="fas fa-users"></i></div>
                <div className={styles.sidebarTitle}>Personnel List</div>
              </div>
              <div className={styles.sidebarItem}>
                <div className={styles.sidebarIcon}><i className="far fa-calendar-alt"></i></div>
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
                <input type="text" onChange={(e) => handleFindPersonnel(e)} placeholder="Find Personnel" name="personnel" className={styles.inputPersonnal} />
                <button className={styles.addPersonnal}>Add Personnel <i className="fas fa-plus"></i></button>
              </div>
            </div>
            <div className={styles.personnalList}>
              <Pagination currentItem={currentItem} />
            </div>
            <div className={styles.buttonPagination}>
              <button onClick={() => handlePrev()} disabled={currentPage === 1 ? true : isPrevDisabled} className={styles.previousButton}><i className="fas fa-chevron-left"></i> Previous Page</button>
              <button onClick={() => handleNext()} disabled={currentPage === lastPage ? true : isNextDisabled} className={styles.nextButton}>Next Page <i className="fas fa-chevron-right"></i></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}