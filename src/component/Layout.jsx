
import Navbar from './Navbar'
import PropTypes from 'prop-types'

const Layout = ({children}) => {
  return (
    <>
      <Navbar />
      <main>
        {children}  
        {/* childrens are basically our whole app main page , movies , Tv shows */}
      </main>
    </>
  )
}
Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default Layout;
