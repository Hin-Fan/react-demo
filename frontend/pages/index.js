import Link from 'next/link'

const Index = props => (
  <div>
    <Link href='/about'>
      <button>Go to About Page</button>
    </Link>
    <p>This is the index page</p>
  </div>
)

// Index.getInitialProps = async function () {
//   const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
//   const data = await res.json();

//   console.log(`Show data fetched. Count: ${data.length}`);

//   return {
//     shows: data.map(entry => entry.show)
//   };
// };

export default Index
