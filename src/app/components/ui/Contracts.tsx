import React, { useState, useMemo } from 'react'
import SearchComponent from './SearchComponent'
import SortButton from './sortButton'
import FilterButton from './filterButton'
import Table from './Table'
import FilterModal from '@/app/components/forms/FilterModal'
import { SortOption } from '@/app/components/forms/SortModal'

const tableHeaders = [
    { key: 'documentType', label: 'Document' },
    { key: 'type', label: 'Type' },
    { key: 'uploadedBy', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    { key: 'action', label: 'Actions' },
]

const initialTableData = [
    {
        documentType: "Federal Tax",
        type: "PDF",
        uploadedBy: "john.doe@example.com",
        role: "Dealer",
        status: "Draft",
        actions: "",
    },
    {
        documentType: "Driving License",
        type: "PDF",
        uploadedBy: "jane.doe@example.com",
        role: "Customer",
        status: "Signed",
        actions: "",
    },
    {
        documentType: "Social Security",
        type: "PDF",
        uploadedBy: "manager@example.com",
        role: "Admin",
        status: "Signed",
        actions: "",
    },
    {
        documentType: "Resale ",
        type: "PDF",
        uploadedBy: "dealer@example.com",
        role: "Dealer",
        status: "Draft",
        actions: "",
    },
    {
        documentType: "Voided Check",
        type: "PDF",
        uploadedBy: "employee@example.com",
        role: "Vendor",
        status: "Pending",
        actions: "",
    },
]

const contractSortOptions: SortOption[] = [
    { id: 'document-asc', label: 'Document Name (A-Z)', value: 'documentType', direction: 'asc' },
    { id: 'document-desc', label: 'Document Name (Z-A)', value: 'documentType', direction: 'desc' },
    { id: 'type-asc', label: 'Type (A-Z)', value: 'type', direction: 'asc' },
    { id: 'status-asc', label: 'Status (A-Z)', value: 'status', direction: 'asc' },
];

const Contracts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<{ value: string; direction: 'asc' | 'desc' }>({ value: 'documentType', direction: 'asc' });
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [activeFilters, setActiveFilters] = useState<any>({});

    const filteredData = useMemo(() => {
        let data = [...initialTableData];

        // Search filter
        if (searchTerm) {
            data = data.filter(item =>
                item.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply filters from modal (status, etc.)
        if (activeFilters.status && activeFilters.status.length > 0) {
            data = data.filter(item => activeFilters.status.includes(item.status));
        }

        // Sort
        data.sort((a: any, b: any) => {
            const valA = a[sortBy.value]?.toString().toLowerCase() || '';
            const valB = b[sortBy.value]?.toString().toLowerCase() || '';
            if (sortBy.direction === 'asc') {
                return valA.localeCompare(valB);
            } else {
                return valB.localeCompare(valA);
            }
        });

        return data;
    }, [searchTerm, sortBy, activeFilters]);

    return (
        <div className='w-full'>
            <div className='w-full lg:w-3/4 gap-4 flex-wrap flex sm:flex-nowrap items-center mb-6'>
                <SearchComponent
                    placeHolder="Search"
                    value={searchTerm}
                    onSearch={setSearchTerm}
                />
                <SortButton sortBy={sortBy} setSortBy={setSortBy} options={contractSortOptions} />
                <FilterButton setOpenFilter={setIsFilterOpen} />
            </div>

            <Table
                headers={tableHeaders}
                data={filteredData}
            />

            <FilterModal
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                onApply={(filters) => setActiveFilters(filters)}
                mode="contracts"
            />
        </div>
    )
}

export default Contracts
