export const COLUMNS = [
    {
        Header : 'Id(PK)',
        accessor : 'id'
    },
    {
        Header : 'QA Date',
        accessor : 'date'
    },
    {
        Header : 'Page Type',
        accessor : 'page_type'
    },
    {
        Header : 'Site Code',
        accessor : 'site_code'
    },
    {
        Header : 'Location',
        accessor : 'location'
    },
    {
        Header : 'Area',
        accessor : 'area'
    },
    {
        Header : 'Title',
        accessor : 'title'
    },
    {
        Header : 'Desc',
        accessor : 'description'
    },
    {
        Header : 'Content',
        accessor : 'contents',
        maxSize: 400,
        minSize: 140,
        size: 200,
    },
    {
        Header : 'Check',
        accessor : 'check_result'
    },
    {
        Header : 'Guide',
        accessor : 'check_reason'
    },
    {
        Header : 'Image',
        accessor : 'image'
    },
    {
        Header : 'Commit',
        accessor : 'commit'
    },
];