import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FaDownload } from "react-icons/fa"
import { VscVerified } from "react-icons/vsc"
import { getUserCertificates } from "../../../services/operations/certificateAPI"
import Img from "../../common/Img"
import { formatDate } from "../../../utils/dateFormatter"

export default function Certificates() {
  const { token } = useSelector((state) => state.auth)
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true)
      const result = await getUserCertificates(token)
      // Filter out certificates with null courseID
      const validCertificates = result.filter(cert => cert.courseID !== null && cert.courseID !== undefined)
      setCertificates(validCertificates)
      setLoading(false)
    }
    fetchCertificates()
  }, [token])

  // Function to generate and download certificate
  const downloadCertificate = (certificate) => {
    // Create a canvas for the certificate
    const canvas = document.createElement("canvas")
    canvas.width = 1200
    canvas.height = 800
    const ctx = canvas.getContext("2d")

    // Set background
    ctx.fillStyle = "#1a1a1a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add border
    ctx.strokeStyle = "#FFD700"
    ctx.lineWidth = 10
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40)

    // Add certificate title
    ctx.font = "bold 60px Arial"
    ctx.fillStyle = "#FFD700"
    ctx.textAlign = "center"
    ctx.fillText("Certificate of Completion", canvas.width / 2, 150)

    // Add eduNexus logo/text
    ctx.font = "bold 40px Arial"
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText("eduNexus", canvas.width / 2, 220)

    // Add recipient name
    ctx.font = "bold 50px Arial"
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText(
      `${certificate.userId.firstName} ${certificate.userId.lastName}`,
      canvas.width / 2,
      350
    )

    // Add course completion text
    ctx.font = "30px Arial"
    ctx.fillStyle = "#CCCCCC"
    ctx.fillText(
      "has successfully completed the course",
      canvas.width / 2,
      420
    )

    // Add course name
    ctx.font = "bold 40px Arial"
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText(`${certificate.courseID?.courseName || 'Unnamed Course'}`, canvas.width / 2, 500)

    // Add certificate ID
    ctx.font = "20px Arial"
    ctx.fillStyle = "#AAAAAA"
    ctx.fillText(
      `Certificate ID: ${certificate.certificateId}`,
      canvas.width / 2,
      600
    )

    // Add issue date
    ctx.font = "20px Arial"
    ctx.fillStyle = "#AAAAAA"
    ctx.fillText(
      `Issued on: ${formatDate(certificate.issueDate)}`,
      canvas.width / 2,
      640
    )

    // Convert canvas to image and download
    const dataURL = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = `${(certificate.courseID?.courseName || 'Certificate').replace(/\s+/g, "_")}_Certificate.png`
    link.href = dataURL
    link.click()
  }

  // Loading skeleton
  const SkeletonLoader = () => {
    return (
      <div className="flex flex-col gap-4 mt-8">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-richblack-800 rounded-lg border border-richblack-700"
          >
            <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
              <div className="h-16 w-16 rounded-lg skeleton"></div>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-40 skeleton rounded"></div>
                <div className="h-3 w-24 skeleton rounded"></div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="h-10 w-full md:w-32 skeleton rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="text-white">
      <h1 className="text-4xl text-richblack-5 font-boogaloo text-center sm:text-left mb-8">
        My Certificates
      </h1>

      {loading ? (
        <SkeletonLoader />
      ) : certificates.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <VscVerified className="text-6xl text-richblack-300 mb-4" />
          <p className="text-3xl text-richblack-5 mb-2">No Certificates Yet</p>
          <p className="text-richblack-300 max-w-md">
            Complete your enrolled courses to earn certificates of completion.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-8">
          {certificates.map((certificate) => (
            <div
              key={certificate._id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-richblack-800 rounded-lg border border-richblack-700 hover:border-richblack-500 transition-all"
            >
              <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
                <Img
                  src={certificate.courseID?.thumbnail || '/path/to/default-thumbnail.jpg'}
                  alt={certificate.courseID?.courseName || 'Course Certificate'}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-richblack-5">
                    {certificate.courseID?.courseName || 'Unnamed Course'}
                  </h3>
                  <p className="text-sm text-richblack-300">
                    Issued on: {formatDate(certificate.issueDate || new Date())}
                  </p>
                </div>
              </div>
              <button
                onClick={() => downloadCertificate(certificate)}
                className="flex items-center gap-2 bg-yellow-50 text-richblack-900 py-2 px-4 rounded-md font-medium hover:bg-yellow-100 transition-all w-full md:w-auto justify-center"
              >
                <FaDownload />
                <span>Download Certificate</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
