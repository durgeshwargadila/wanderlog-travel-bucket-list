import React, { useState } from 'react';
import { useBucketList } from '../hooks/useBucketList';
import { BucketListTabs } from '../components/BucketList/BucketListTabs';
import { WishList } from '../components/BucketList/WishList';
import { VisitedList } from '../components/BucketList/VisitedList';
import { InfoStat } from '../components/Common/InfoStat';
import { Globe, Heart, Award, Percent } from 'lucide-react';

export default function BucketListPage() {
  const { wishlist, visitedList } = useBucketList();
  const [activeTab, setActiveTab] = useState('wishlist');

  const wishlistPopulation = wishlist.reduce((acc, curr) => acc + (curr.population || 0), 0);
  const visitedPopulation = visitedList.reduce((acc, curr) => acc + (curr.population || 0), 0);
  
  const WORLD_POPULATION = 7888000000;
  const coveragePercent = Math.min(((visitedPopulation / WORLD_POPULATION) * 100), 100);

  return (
    <div className="bucket-list-page-container">
      <header className="explore-hero">
        <h1 className="explore-hero-title">Your Travel Dashboard</h1>
        <p className="explore-hero-subtitle">
          Manage destination plans, prioritize itineraries, and track coverage metrics.
        </p>
      </header>

      <section className="dashboard-stats-grid">
        <InfoStat 
          label="Want to Visit" 
          value={`${wishlist.length} ${wishlist.length === 1 ? 'country' : 'countries'}`} 
          icon={Heart} 
          className="dashboard-stat-wish"
        />
        <InfoStat 
          label="Have Visited" 
          value={`${visitedList.length} ${visitedList.length === 1 ? 'country' : 'countries'}`} 
          icon={Award} 
          className="dashboard-stat-visit"
        />
        <InfoStat 
          label="World Coverage" 
          value={`${coveragePercent.toFixed(4)}%`} 
          icon={Percent} 
          className="dashboard-stat-coverage"
        />
        <InfoStat 
          label="Visited Population" 
          value={visitedPopulation.toLocaleString()} 
          icon={Globe} 
          className="dashboard-stat-pop"
        />
      </section>

      <section className="dashboard-tabs-section">
        <BucketListTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          wishlistCount={wishlist.length}
          visitedCount={visitedList.length}
        />
      </section>

      <main className="dashboard-list-main">
        {activeTab === 'wishlist' ? (
          <div role="tabpanel" id="wishlist-panel" aria-labelledby="wishlist-tab">
            <WishList />
          </div>
        ) : (
          <div role="tabpanel" id="visited-panel" aria-labelledby="visited-tab">
            <VisitedList />
          </div>
        )}
      </main>
    </div>
  );
}
