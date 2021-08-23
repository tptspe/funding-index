import React from 'react';
import axios from 'axios';

const fetchData = async () => await axios.get('https://api.company-information.service.gov.uk/search/companies?q=Greensted', { headers: { Authorization: `Basic MjFiZWQ0YzctY2Y1MC00NjZjLTlhMTQtYjEzMGRmNTNjZmNhOg==`}})
      .then(res => ({
        error: false,
        companies: res.data,
      }))
      .catch(() => ({
          error: true,
          companies: null,
        }),
      );

const CompaniesPage = ({companies}) => {
  return (
    <div>
      Companies Page
    </div>
  );
};

export default CompaniesPage;

export const getServerSideProps = async () => {
  const data = await fetchData();

  return {
    props: data,
  };
}
