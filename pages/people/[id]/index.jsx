import { NextSeo } from 'next-seo';

import Cases from 'components/Cases/Cases';
import BackButton from 'components/Layout/BackButton/BackButton';
import PersonView from 'components/PersonView/PersonView';

// hiding create new record as production isn't ready
const CasesPage = ({ query }) => {
  return (
    <div>
      <NextSeo title={`#${query.id} Cases`} noindex />
      <BackButton />
      <PersonView personId={query.id} />
      <div className="lbh-table-header">
        <div>
          <h3 className="govuk-fieldset__legend--m govuk-custom-text-color govuk-!-margin-top-0">
            RECORDS HISTORY
          </h3>
          <p className="govuk-label  govuk-!-margin-top-0">
            Linked files are read only
          </p>
        </div>
        {/* <LinkButton label="Add a new record" route={`${query.id}/record`} /> */}
      </div>
      <hr className="govuk-divider" />
      <Cases {...query} />
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  return {
    props: {
      query,
    },
  };
};

export default CasesPage;
