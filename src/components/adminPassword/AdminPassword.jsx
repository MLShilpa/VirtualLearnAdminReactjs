import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showProfileFn } from '../../redux/showProfile'
import './AdminPassword.css'
import { Base_Url } from '../../utils/baseUrl'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'


const AdminPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const notify = () =>
    toast.success('password changed successfully', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })

  const passwordMismatch = () =>
    toast.warning('Password mismatch', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })

  const samePassword = () =>
    toast.warning('Password Should not be same as Old Password', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  const adminPasswordHandler = (e) => {
    e.preventDefault()
    const currentPass = e.target.currentPass.value
    const newPass = e.target.newPass.value
    const confirmPass = e.target.confirmPass.value
    // console.log('settings', currentPass, newPass, confirmPass)
    if (newPass === confirmPass) {
      axios(
        `${Base_Url}/api/v1/change_password`,
        {
          method: 'patch',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          data: {
            previousPassword: currentPass,
            newPassword: confirmPass,
          },
        },
      )
        //     .then((res) => {
        //       console.log(res.data.message)
        //       if (res) {
        //         // alert(res.data.message)
        //         // alert(res.data)
        //         // console.log('profile edit', res)

        //         if ((res && res.status && res.status) === 200) {
        //           if (
        //             (res && res.data && res.data.message && res.data.message) ===
        //             'Password Should not be same as Old Password'
        //           ) {
        //             toast.warning('Password Should not be same as Old Password', {
        //               position: 'bottom-center',
        //               autoClose: 5000,
        //               hideProgressBar: true,
        //               closeOnClick: true,
        //               pauseOnHover: true,
        //               draggable: true,
        //               progress: undefined,
        //               theme: 'colored',
        //             })
        //           } else if (
        //             (res && res.data && res.data.message && res.data.message) ===
        //             'Incorrect Password'
        //           ) {
        //             toast.warning('Incorrect Password', {
        //               position: 'bottom-center',
        //               autoClose: 5000,
        //               hideProgressBar: true,
        //               closeOnClick: true,
        //               pauseOnHover: true,
        //               draggable: true,
        //               progress: undefined,
        //               theme: 'colored',
        //             })
        //           } else {
        //             toast.success('Password Changed Successfully', {
        //               position: 'top-left',
        //               autoClose: 5000,
        //               hideProgressBar: true,
        //               closeOnClick: true,
        //               pauseOnHover: true,
        //               draggable: true,
        //               progress: undefined,
        //               theme: 'colored',
        //             })
        //             const currentPass = null
        //             const newPass = null
        //             const confirmPass = null
        //           }
        //           // navigate('/newPassword')
        //         }
        //       }
        //     })
        //     .catch((err) => {
        //       console.log('error', err)
        //       // alert('Some error occured')
        //       // alert(
        //       //   err &&
        //       //     err.response &&
        //       //     err.response.data &&
        //       //     err.response.data.Error &&
        //       //     err.response.data.Error,
        //       // )
        //     })
        // } else {
        //   passwordMismatch()
        // }

        .then((res) => {
          console.log(res)
          if (res) {
            // alert(res.data.message)
            // alert(res.data)
            // console.log('profile edit', res)

            if ((res && res.status && res.status) === 200)
              toast.success('Password updated Successfully', {
                position: 'top-left',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
              })
            navigate('/newPassword')
          }
        }
        )
        .catch((err) => {
          if (
            (err && err.response && err.response.status && err.response.status) ===
            400 || 403
          ) {
            toast.warning('Incorrect Password', {
              position: 'bottom-center',
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            })
          } else if (
            (err && err.data && err.data.message && err.data.message) ===
            'Incorrect Password'
          ) {
            toast.warning('Incorrect Password', {
              position: 'bottom-center',
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            })
          }
          else {
            console.log('error', err)
            // alert(
            //   err &&
            //   err.response &&
            //   err.response.data &&
            //   err.response.data.Error &&
            //   err.response.data.Error,
            // )
          }
        })
    } else {
      passwordMismatch()
    }


  }
  return (
    <div className="studentList-container">
      <div className="admin-changePassword">Change Password</div>
      <div className="admin-form">
        <form
          action=""
          className="admin-formController"
          onSubmit={(e) => {
            adminPasswordHandler(e)
          }}
        >
          <div className="admin-formContainer">
            <div className="admin-label">
              <label className="admin-label">Change Password</label>
              <input
                type="password"
                className="admin-input"
                placeholder="Change Password"
                name="currentPass"
                required
              />
            </div>

            <div className="admin-label">
              <label className="admin-label">New Password</label>
              <input
                type="password"
                className="admin-input"
                placeholder="New Password"
                name="newPass"
                required
              />
            </div>

            <div className="admin-label">
              <label className="admin-label">Confirm Password</label>
              <input
                type="password"
                className="admin-input"
                placeholder="Confirm Password"
                name="confirmPass"
                required
              />
            </div>
          </div>

          <div className="admin-label">
            <button type="submit" className="admin-buttonSave">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminPassword
