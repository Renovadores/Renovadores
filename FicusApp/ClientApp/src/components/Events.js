import EventList from './EventList';

function Events() {
  return (
    <div className="container">
      <div className="row mx-2">
        <h1>Eventos</h1>
      </div>
      <div className="row">
        <EventList />
      </div>
      
    </div>
  );
}
export default Events;