import React, { useState } from 'react'
import axios from 'axios';
import { ServerAddress } from '../../../../config'

const AddCountry = () => {
  const [name, setName] = useState('');
  const [path, setPath] = useState('');

  const convertToPath = (name) => {
    const withoutAccent = removeAccents(name.toLowerCase());
    return withoutAccent.replace(/\s+/g, '-');
  };

  const removeAccents = (str) => {
    return str
      .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
      .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
      .replace(/[ìíịỉĩ]/g, 'i')
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
      .replace(/[ùúụủũưừứựửữ]/g, 'u')
      .replace(/[ỳýỵỷỹ]/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9 -]/g, '') // loại bỏ các ký tự không phải chữ cái, số, dấu cách, hoặc dấu gạch ngang
      .replace(/\s+/g, '-'); // thay thế các dấu cách bằng dấu gạch ngang
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setPath("phim-" + convertToPath(newName)); // Tự động cập nhật đường dẫn khi nhập tên thể loại
  };

  const AddNewCountry = () => {
    const data = {
      name,
      path
    };
    axios.post(`${ServerAddress}/country`, data)
      .then(() => {
        alert('Thêm quốc gia thành công');
        setName('');
        setPath('');
      })
      .catch((error) => {
        alert("Đã xảy ra lỗi. Kiểm tra console để xem")
        console.log(error);
      })
  };

  return (
    <div>
      <h1 className='text-3xl my-8 font-semibold'>Thêm quốc gia</h1>
      <p className='font-bold'>Tên quốc gia</p>
      <input value={name} onChange={handleNameChange} type='text' className='w-full border-gray-500 border-2' />
      <p className='font-bold'>Đường dẫn</p>
      <input value={path} onChange={(e) => setPath(e.target.value)} type='text' className='w-full border-gray-500 border-2' />

      <br />
      <button onClick={() => AddNewCountry()} class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Thêm quốc gia
      </button>
    </div>
  )
}

export default AddCountry