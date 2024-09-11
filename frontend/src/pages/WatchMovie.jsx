import React, { useState, useEffect } from 'react'
import { Dropdown } from 'flowbite-react'
import axios from 'axios'
import { ServerAddress } from '../../config'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { GetAccountData } from '../scripts/Authentication'
import ReactPaginate from 'react-paginate'



import ReportCommentModal from '../components/ReportCommentModal'
import EditCommentModal from '../components/EditCommentModal'

import ReportEpisodeModal from '../components/ReportEpisodeModal'

const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const day = dateTime.getDate().toString().padStart(2, '0');
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
  const year = dateTime.getFullYear();

  return `${hours}:${minutes} - ${day}/${month}/${year}`;
};



const WatchMovie = () => {
  const navigate = useNavigate();
  const { moviePath, episodePath } = useParams();

  const [role, setRole] = useState('');
  const [accountId, setAccountId] = useState('');

  const [newMovies, setNewMovies] = useState([]);

  useEffect(() => {
    axios.get(`${ServerAddress}/movie`)
      .then((result) => {
        console.log(result);
        setNewMovies(result.data.data.slice(0, 10));
      })
      .catch((error) => {
        alert('error');
        console.log(error);
      })
  }, [])

  useEffect(() => {
    GetAccountData()
      .then(data => {
        if (data.data === 'token is missing') setRole('no role');
        else {
          setRole(data.data.data.role);
          setAccountId(data.data.data.id);
        }

      })
      .catch(error => {
        console.log(error);
        // Xử lý lỗi nếu cần
      });
  }, [])

  const [episode, setEpisode] = useState([]);
  //Lấy dữ liệu phim với phim path
  const [movie, setMovie] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    axios.get(`${ServerAddress}/movie/path/${moviePath}`)
      .then((result) => {
        console.log(result.data);
        setMovie(result.data);
        // Lấy dữ liệu các tập phim với _id phim
        axios.get(`${ServerAddress}/episode/movie/${result.data._id}`)
          .then((result) => {
            console.log(result.data.data);
            setEpisodes(result.data.data);
          })
          .catch((error) => {
            alert("error");
            console.log(error);
          })

        //Lấy dữ liệu tập phim hiện tại

        axios.get(`${ServerAddress}/episode/path/${episodePath}/${result.data._id}`)
          .then((result) => {
            console.log(result.data);
            if (result.data === null) {
              alert('tập phim không tồn tại')
              navigate('/')
            }
            setEpisode(result.data);
          })
          .catch((error) => {
            alert("error");
            console.log(error)
          })
      })
      .catch((error) => {
        alert("error");
        console.log(error);
      })
  }, [])


  //Phân trang các tập phim để không tràn và dễ dàng chọn lựa
  const itemsPerPage = 100; // Số tập phim hiển thị trên mỗi trang

  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

  // Tính toán số lượng trang
  const totalPages = Math.ceil(episodes.length / itemsPerPage);

  // Tính chỉ số của tập phim đầu tiên và tập phim cuối cùng trên trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, episodes.length - 1);

  // Lấy danh sách tập phim trên trang hiện tại
  const currentEpisodes = episodes.slice(startIndex, endIndex + 1);

  // Hàm chuyển đến trang mới
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Render các nút phân trang
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button className="bg-gray-800 text-white px-2 py-1 rounded-md mr-2 mb-2 focus:outline-none" key={i} onClick={() => goToPage(i)}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  // Hiển thị danh sách tập phim trên trang hiện tại
  const renderEpisodes = () => {
    return currentEpisodes.sort((a, b) => a.episodeNumber - b.episodeNumber).map((ep, index) => (
      <a href={`/xem-phim/${moviePath}/${ep.path}`} key={index}>
        <button className='bg-[#000000] hover:bg-[#fb8e8e] text-white font-bold py-2 px-2 rounded ml-3 mb-3'>
          Tập {ep.episodeNumber}
        </button>
      </a>
    ));
  };

  //Hiển thị bình luận
  const [comments, setComments] = useState([]);
  //Phân trang bình luận
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10); // Số lượng item trên mỗi trang
  const [pageCount, setPageCount] = useState(0);
  const [forcePage, setForcePage] = useState(0);

  const [commentCount, setCommentCount] = useState();
  // Hàm lấy bình luận trong episode
  const GetComments = () => {
    axios.get(`${ServerAddress}/comment/get-comment-in-movie/${movie._id}`)
      .then((result) => {
        const data = result.data.data;
        const slice = data.slice(offset, offset + perPage);
        setComments(slice);
        setPageCount(Math.ceil(data.length / perPage));
        setCommentCount(result.data.data.length)
        console.log(result.data.data);
      })
      .catch((error) => {
        alert('error');
        console.log(error);
      })
  }
  //Tự động lấy bình luận
  useEffect(() => {
    if (movie._id) {
      GetComments();
    }
  }, [movie, offset, perPage])

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setForcePage(selectedPage);
    setOffset(selectedPage * perPage);
  };

  //Bình luận
  const [content, setContent] = useState('');

  const AddNewComment = () => {
    if (content === "") {
      alert('Bạn chưa nhập nội dung bình luận!');
      return;
    }
    const data = {
      content: content,
      account: accountId,
      movie: movie._id
    }
    axios.post(`${ServerAddress}/comment`, data)
      .then((result) => {
        setContent('');
        // Gọi hàm GetComments() để cập nhật bình luận
        GetComments();
      })
      .catch((error) => {
        alert('error');
        console.log(error);
      })
  }

  const DeleteComment = (id) => {
    axios.delete(`${ServerAddress}/comment/${id}`)
      .then((result) => {
        // Gọi hàm GetComments() để cập nhật bình luận
        GetComments();
      })
      .catch((error) => {
        alert('error');
        console.log(error);
      })
  }
  //Sửa bình luận
  const [currentContent, setCurrentContent] = useState('');
  const [currentCommentId, setCurrentCommentId] = useState('');
  const [showEditCommentModal, setShowEditCommentModal] = useState(false);

  const handleEditCommentClick = (content, commentId) => {
    setCurrentCommentId(commentId);
    setCurrentContent(content);
    setShowEditCommentModal(true);
  }

  const handleCloseEditCommentModal = () => {
    setShowEditCommentModal(false);
  }

  //Tố cáo bình luận
  const [showReportCommentModal, setShowReportCommentModal] = useState(false);

  const handleReportCommentClick = (commentId) => {
    setCurrentCommentId(commentId);
    setShowReportCommentModal(true);
  };

  const handleCloseReportCommentModal = () => {
    setShowReportCommentModal(false);
  };

  //Báo lỗi tập phim

  const [showReportEpisodeModal, setShowReportEpisodeModal] = useState(false);

  const ShowReportEpisodeModal = () => {
    setShowReportEpisodeModal(true);
  }
  const handleCloseReportEpisodeModal = () => {
    setShowReportEpisodeModal(false);
  }


  //Thêm vào lịch sử nếu đã đăng nhập
  useEffect(() => {
    if(movie && episode && accountId){
      const data = {
        account: accountId,
        movie: movie._id,
        episode: episode._id
      }
      axios.post(`${ServerAddress}/watchHistory`, data)
      .then(() => {
      })
    }
  }, [movie, episode, accountId])
  //Tăng view cho phim nếu có người xem
  useEffect(() => {
    if(movie._id){
      axios.get(`${ServerAddress}/movie/add-one-view/${movie._id}`)
      .then((result) => {
      })
    }
  }, [movie])

  return (
    <div className='bg-black'>
      <Header />
      <div className='bg-black lg:pl-[10%] lg:pr-[10%]'>
        <div className='mx-auto w-[1200px]'>
          <div className='bg-[#434242] rounded-2xl pt-3 mt-3 pb-3'>
            <div className='flex ml-3 text-white'>
              <a href='/'>Trang chủ</a> {String.fromCharCode(187)} <a href={`/phim/${movie.path}`}> {movie.title} </a> {String.fromCharCode(187)} Tập {episode.episodeNumber}
            </div>
          </div>


          <div className='lg:flex'>
            <div className='lg:w-[75%] md:w-[100%] sm:w-[100%] h-full'>
              <div className='bg-[#434242] flex h-full mt-3 rounded-xl pt-3 pb-3'>
                <div className='justify-center ml-3 mr-3 min-h-[600px]' style={{ width: '100%', height: 'auto' }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={episode.episodeUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={true}
                  ></iframe>
                </div>
              </div>
              <div className='bg-[#434242] grid-cols-3 h-full mt-3 rounded-xl pt-2 pb-2'>
                <div className='pb-3 text-center justify-center font-bold text-white'>
                  <span className='text-white ml-44 text-3xl'>Chọn tập</span>
                  <button onClick={ShowReportEpisodeModal} className='float-right text-xl rounded-md mr-2 p-2 bg-blue-500'>Báo lỗi tập phim</button>
                </div>
                <hr />
                {/* Hiển thị phân trang */}
                <div className='flex justify-center space-x-10 mt-2'>
                  <span className='text-white text-2xl'>Trang</span>
                  {renderPagination()}
                </div>
                <hr />
                <div className='pt-2'>
                  {/* Hiển thị danh sách tập phim trên trang hiện tại */}
                  {renderEpisodes()}

                </div>
              </div>
              {/* COMMENT */}
              <div className='bg-[#434242] flex h-full mt-3 rounded-xl pt-3 pb-3'>
                <div className='justify-center ml-3 mr-3' style={{ width: '100%', height: 'auto', minHeight: '100px' }}>

                  <div className='text-white justify-center'>
                    {/*Bình luận */}
                    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
                      <div className="max-w-2xl mx-auto px-4">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Bình luận ({commentCount})</h2>
                          <select value={perPage} onChange={(e) => setPerPage(e.target.value)} className='ml-2 p-1 text-black rounded'>
                            <option>5</option>
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                          </select>
                        </div>
                        {/*Nếu đã đăng nhập thì hiển thị ô bình luận */}
                        {(role === 'user' || role === 'admin') && (
                          <div className="mb-6">
                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                              <label htmlFor="comment" className="sr-only">Your comment</label>
                              <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                id="comment" rows="6"
                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                placeholder="Viết bình luận" required></textarea>
                            </div>
                            <button onClick={() => AddNewComment()}
                              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-blue-800">
                              Đăng bình luận
                            </button>
                          </div>
                        )}
                        {comments
                          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                          .map((comment, index) => (
                            <article key={index} className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                              <footer className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src={comment.account.avatar === '' ? (comment.account.gender === 'Nam' ? 'default-avatar-male.jpg' : 'default-avatar-female.svg') : comment.account.avatar}
                                    alt="Avatar" />{comment.account.username}</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {comment.updatedAt === comment.createdAt ? (
                                      <time pubdate="true" dateTime={comment.updatedAt} title={formatDateTime(comment.updatedAt)}>
                                        {formatDateTime(comment.updatedAt)}
                                      </time>
                                    ) : (
                                      <span>
                                        Đã chỉnh sửa:{' '}
                                        <time pubdate="true" dateTime={comment.updatedAt} title={`Chỉnh sửa lần cuối: ${formatDateTime(comment.updatedAt)}`}>
                                          {formatDateTime(comment.updatedAt)}
                                        </time>
                                      </span>
                                    )}
                                  </p>
                                </div>
                                <div
                                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                  type="button">
                                  <Dropdown label={<svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                  </svg>} inline>

                                    {(accountId === comment.account._id || role === "admin") && (
                                      <div>
                                        <Dropdown.Item onClick={() => handleEditCommentClick(comment.content, comment._id)}>Sửa</Dropdown.Item>
                                        <Dropdown.Item onClick={() => DeleteComment(comment._id)}>Xoá</Dropdown.Item>
                                      </div>
                                    )}
                                    {(role !== "no role") && (
                                      <Dropdown.Item onClick={() => handleReportCommentClick(comment._id)}>Tố cáo</Dropdown.Item>
                                    )}

                                  </Dropdown>
                                </div>

                              </footer>
                              <p className="text-gray-500 dark:text-gray-400">{comment.content}</p>
                            </article>
                          ))}
                        <ReactPaginate
                          previousLabel={'<'}
                          nextLabel={'>'}
                          breakLabel={'...'}
                          pageCount={pageCount}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageClick}
                          containerClassName={'flex justify-center mt-8'}
                          pageClassName={'mx-1 px-3 py-2 bg-black rounded-lg'}
                          previousClassName={'mx-1 px-3 py-2 bg-black rounded-lg'}
                          nextClassName={'mx-1 px-3 py-2 bg-black rounded-lg'}
                          breakClassName={'mx-1 px-3 py-2 bg-black rounded-lg'}
                          activeClassName={'bg-blue-500 text-white active'}
                          forcePage={forcePage}
                        />
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-[#434242] lg:w-[25%] w-[100%] h-full lg:ml-3 mt-3 rounded-xl pt-3 pb-3'>
              <div className='text-center text-[#ffc23d] font-bold text-3xl'>
                <span>Phim mới</span><br />
              </div>
              {/*Hiển thị*/}
              <hr />
              {newMovies
                .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
                .map((movie, index) => (
                  <div key={index} className='bg-[#525151] hover:bg-[#646161]'>
                    <a href={`/phim/${movie.path}`}>
                      <div className='flex'>
                        <img
                          src={movie.poster}
                          width="60"
                          height="100"
                          className="object-cover"
                          alt={movie.title}
                        />
                        <div className="flex flex-col">
                          <span className='text-white'>{movie.title}</span><br />
                          <span className='text-white'>{movie.releaseYear}</span>
                        </div>
                      </div>
                    </a>
                    <hr />
                  </div>
                ))}

            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/*Modal Tố cáo bình luận */}
      <ReportCommentModal isOpen={showReportCommentModal} onClose={handleCloseReportCommentModal}
        currentCommentId={currentCommentId} />
      {/*Modal sửa bình luận */}
      <EditCommentModal isOpen={showEditCommentModal} onClose={handleCloseEditCommentModal}
        currentContent={currentContent} currentCommentId={currentCommentId} updateComments={GetComments} />
      {/*Modal báo lỗi tập phim */}
      <ReportEpisodeModal isOpen={showReportEpisodeModal} onClose={handleCloseReportEpisodeModal} currentEpisodeId={episode._id} />
    </div>
  )
}

export default WatchMovie