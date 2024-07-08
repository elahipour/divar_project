import CategoryForm from "../components/CategoryForm";
import CategoryList from "../components/CategoryList";
import styles from '../styles/admin.module.css'
function Admin() {
  return (
    <div className={styles.category}>
      <CategoryList/>
      <CategoryForm/>
    </div>
  )
}

export default Admin