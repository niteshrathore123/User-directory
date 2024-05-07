import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../Redux/userSlice';
import Select from 'react-select';
import '../Styles/UserList.css';

const UserList = () => {
    const { userList, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [firstNameFilter, setFirstNameFilter] = useState([]);
    const [lastNameFilter, setLastNameFilter] = useState([]);
    const [phoneFilter, setPhoneFilter] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRows, setFilteredRows] = useState([]);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        const filtered = userList.filter((user) =>
            (firstNameFilter.length === 0 || firstNameFilter.some(filter => user.firstName.toLowerCase().includes(filter.value.toLowerCase()))) &&
            (lastNameFilter.length === 0 || lastNameFilter.some(filter => user.lastName.toLowerCase().includes(filter.value.toLowerCase()))) &&
            (phoneFilter.length === 0 || phoneFilter.some(filter => user.phone.toLowerCase().includes(filter.value.toLowerCase()))) &&
            Object.values(user).some((value) =>
                value.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setFilteredRows(filtered);
    }, [userList, firstNameFilter, lastNameFilter, phoneFilter, searchQuery]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!userList) return null;

    const firstNameOptions = [...new Set(userList.map(user => ({ value: user.firstName, label: user.firstName })))];
    const lastNameOptions = [...new Set(userList.map(user => ({ value: user.lastName, label: user.lastName })))];
    const phoneOptions = [...new Set(userList.map(user => ({ value: user.phone, label: user.phone })))];

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            borderBottom: '1px solid #ccc',
            color: state.isSelected ? 'white' : 'black',
            backgroundColor: state.isSelected ? '#007bff' : 'white',
            '&:hover': {
                backgroundColor: '#007bff',
                color: 'white'
            }
        }),
    };

    const handleFirstNameChange = (selectedOptions) => {
        setFirstNameFilter(selectedOptions);
    };

    const handleLastNameChange = (selectedOptions) => {
        setLastNameFilter(selectedOptions);
    };

    const handlePhoneChange = (selectedOptions) => {
        setPhoneFilter(selectedOptions);
    };

    const flattenAddress = (user) => {
        if (user.address) {
            return `${user.address || ''}`;
        } else {
            return '';
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'firstName', headerName: 'First Name', flex: 1 },
        { field: 'lastName', headerName: 'Last Name', flex: 1 },
        { field: 'age', headerName: 'Age', flex: 1 },
        { field: 'gender', headerName: 'Gender', flex: 1 },
        { field: 'phone', headerName: 'Phone Number', flex: 1 },
        { field: 'address', headerName: 'Address', flex: 1, valueGetter: flattenAddress },
    ];

    const handleRowClick = (params) => {
        const userId = params.row.id;
        navigate(`/userDetails/${userId}`);
    };

    return (
        <div style={{ height: 500, width: '100%' }}>
            <div className="filter-container">
                <div className='mutli-select'>
                    <Select
                        className="select"
                        options={firstNameOptions}
                        isMulti
                        onChange={handleFirstNameChange}
                        styles={customStyles}
                        placeholder="Filter by First Name"
                    />
                    <Select
                        className="select"
                        options={lastNameOptions}
                        isMulti
                        onChange={handleLastNameChange}
                        styles={customStyles}
                        placeholder="Filter by Last Name"
                    />
                    <Select
                        className="select"
                        options={phoneOptions}
                        isMulti
                        onChange={handlePhoneChange}
                        styles={customStyles}
                        placeholder="Filter by Phone Number"
                    />
                </div>
                
                <input
                    className="global-search"
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <DataGrid
                rows={filteredRows}
                columns={columns}
                pageSize={5}
                checkboxSelection={false}
                disableSelectionOnClick
                rowHeight={50}
                getRowId={(row) => row.id}
                autoHeight
                onRowClick={handleRowClick}
            />
        </div>
    );
}

export default UserList;
