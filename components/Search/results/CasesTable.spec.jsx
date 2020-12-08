import { render } from '@testing-library/react';

import CasesTable from './CasesTable';

describe('CasesTable component', () => {
  const props = {
    records: [
      {
        personId: 123,
        caseFormTimestamp: '25 Oct 2020',
        firstName: 'foo',
        lastName: 'bar',
        caseFormUrl: 'https://foo.bar',
        officerEmail: 'Fname.Lname@hackney.gov.uk',
      },
    ],
  };
  it('should render properly', () => {
    const { asFragment } = render(<CasesTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});