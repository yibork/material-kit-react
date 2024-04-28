import { Helmet } from 'react-helmet-async';

import { OpportunityView } from 'src/sections/opportunities/view';

// ----------------------------------------------------------------------

export default function OpportunityPage() {
  return (
    <>
      <Helmet>
        <title> Opportunities  </title>
      </Helmet>

      <OpportunityView />
    </>
  );
}
