import React, { useState, useEffect } from 'react';
import { MdReport } from 'react-icons/md';
import { ServerAddress } from '../../config';
import axios from 'axios';

const ReportModal = ({ isOpen, onClose, currentEpisodeId }) => {
    const [reasons, setReasons] = useState([]);
    const [detail, setDetail] = useState('');

    //Làm trống mỗi khi bật modal
    useEffect(() => {
        setReasons([]);
        setDetail('');
    }, [isOpen])

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setReasons(prevReasons => [...prevReasons, name]);
        } else {
            setReasons(prevReasons => prevReasons.filter(reason => reason !== name));
        }
    };

    const handleReport = () => {
        // Handle report logic here
        if(detail === ""){
            alert('Vui lòng nhập chi tiết báo cáo');
            return;
        }
        const data = {
            episode: currentEpisodeId,
            reasons: reasons,
            detail: detail
        }
        console.log(data);
        axios.post(`${ServerAddress}/reportEpisode`, data)
        .then((result) => {
            alert('Báo lỗi tập phim thành công!');
            onClose();
            console.log(result);
        })
        .catch((error) => {
            alert('error');
            console.log(error);
        })
    };

    if (!isOpen) return null;

    return (
        <div className="bg-gray-500 bg-opacity-75 fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto text-5xl text-red-500 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                {<MdReport/>}
                            </div>

                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Báo lỗi tập phim</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">Vui lòng chọn lý do:</p>
                                    <div className="mt-2 flex-col">
                                        <div>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="Link chết"
                                                    checked={reasons.linkDead}
                                                    onChange={handleCheckboxChange}
                                                    className="h-5 w-5 text-red-600"
                                                />
                                                <span className="ml-2 text-gray-700">Link chết</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="Tập không theo thứ tự"
                                                    checked={reasons.episodeInWrongOrder}
                                                    onChange={handleCheckboxChange}
                                                    className="h-5 w-5 text-red-600"
                                                />
                                                <span className="ml-2 text-gray-700">Tập không theo thứ tự</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="Lỗi video"
                                                    checked={reasons.videoIssue}
                                                    onChange={handleCheckboxChange}
                                                    className="h-5 w-5 text-red-600"
                                                />
                                                <span className="ml-2 text-gray-700">Video (bị mờ hoặc bị cắt)</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="Lỗi âm thanh"
                                                    checked={reasons.soundIssue}
                                                    onChange={handleCheckboxChange}
                                                    className="h-5 w-5 text-red-600"
                                                />
                                                <span className="ml-2 text-gray-700">Âm thanh (khó nghe, không khớp hoặc thiếu)</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="Lỗi phụ đề (thiếu, khó đọc, không khớp âm thanh,...)"
                                                    checked={reasons.subIssue}
                                                    onChange={handleCheckboxChange}
                                                    className="h-5 w-5 text-red-600"
                                                />
                                                <span className="ml-2 text-gray-700">Phụ đề (thiếu, khó đọc, không khớp âm thanh,...)</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="Khác"
                                                    checked={reasons.other}
                                                    onChange={handleCheckboxChange}
                                                    className="h-5 w-5 text-red-600"
                                                />
                                                <span className="ml-2 text-gray-700">Khác</span>
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <div className="mt-4">
                                    <label htmlFor="details" className="block text-sm font-medium text-gray-700">Chi tiết</label>
                                    <textarea
                                        id="details"
                                        name="details"
                                        rows="3"
                                        className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Nhập chi tiết..."
                                        value={detail}
                                        onChange={(e) => setDetail(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            onClick={handleReport}
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Báo lỗi
                        </button>
                        <button
                            onClick={onClose}
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Huỷ bỏ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;
