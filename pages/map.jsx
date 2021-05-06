import Map from 'components/map';

const MapPage = ({ garbageList }) => <Map garbageList={garbageList} />;

export async function getServerSideProps() {
  try {
    // const res = await get('/');
    // const members = res['hydra:member'];
    const garbageList = [{ localisation: [47.7367706331, 7.30612428404] }];
    return {
      props: {
        garbageList,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        garbageList: [],
      },
    };
  }
}

export default MapPage;
