import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ServerAddress } from '../../../../config';

const EditCountry = () => {
    const { id } = useParams();
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
    
    //Lấy dữ liệu cho country với id country
    useEffect(() => {
        axios.get(`${ServerAddress}/country/${id}`)
        .then((result) => {
            console.log(result.data);
            setName(result.data.name);
            setPath(result.data.path);
        })
        .catch((error) => {
            alert("error");
            console.log(error);
        })
    }, [])

    const SaveCountry = () => {
        const data = {
            name,
            path
        };
        axios.put(`${ServerAddress}/country/${id}`, data)
        .then((result) => {
            alert('Sửa quốc gia thành công!');
            window.close();
        })
        .catch((error) => {
            alert('Sửa không thành công');
            console.log(error);
        })
    }
    
    return (
        <div style={{paddingLeft: '20%', paddingRight: '20%'}}>
            <h1 className='text-3xl my-8 font-semibold'>Sửa quốc gia</h1>
            <p className='font-bold'>Tên quốc gia</p>
            <input value={name} onChange={handleNameChange} type='text' className='w-full border-gray-500 border-2' />
            <p className='font-bold'>Đường dẫn</p>
            <input value={path} onChange={(e) => setPath(e.target.value)} type='text' className='w-full border-gray-500 border-2' />

            <br />
            <button onClick={() => SaveCountry()} class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sửa quốc gia
            </button>
        </div>
    )
}

export default EditCountry