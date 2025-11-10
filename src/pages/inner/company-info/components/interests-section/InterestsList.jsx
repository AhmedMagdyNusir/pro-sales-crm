import InterestCard from './InterestCard';

export default function InterestsList({ interests }) {
  return (
    <div className="grid animate-fade-in-fast grid-cols-1 gap-3 lg:grid-cols-2">
      {interests.map((interest) => (
        <InterestCard key={interest.id} interest={interest} />
      ))}
    </div>
  );
}
