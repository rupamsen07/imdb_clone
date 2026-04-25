import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Top10List from './components/Top10List';
import TopBoxOffice from './components/TopBoxOffice';
import Footer from './components/Footer';
import Card from './components/Card';
import Hero from './components/Hero';
import MovieModal from './components/MovieModal';
import WishlistPage from './components/WishlistPage';
import TralierBox from './components/tralier-box';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w300';

function App() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('home'); // 'home' or 'wishlist'
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);

  const handleSearch = (query) => {
    if (!query || !query.trim()) return;
    setSearchQuery(query.trim());
    navigate(`/?q=${encodeURIComponent(query.trim())}`);
  };

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        const pagesToFetch = 13;
        const requests = [];
        for (let i = 1; i <= pagesToFetch; i++) {
          requests.push(
            fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${i}`).then(res => res.json())
          );
        }
        const responses = await Promise.all(requests);
        let allMovies = responses.flatMap(r => r.results || []);
        
        const sortedMovies = allMovies.sort((a, b) => {
          const ratingA = parseFloat(a.vote_average) || 0;
          const ratingB = parseFloat(b.vote_average) || 0;
          return ratingB - ratingA;
        });

        const top10 = sortedMovies.slice(0, 10);
        setTrendingMovies(top10);
        setHeroMovie(top10[0]);
      } catch (err) {
        console.error('Error fetching Top 10 movies:', err);
      }
    };
    fetchTop10();

    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          setTopRatedMovies(data.results.slice(0, 6));
        }
      });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`)
        .then(res => res.json())
        .then(data => {
          if (data.results) {
            setSearchResults(data.results);
          }
          setIsSearching(false);
        })
        .catch(err => {
          console.error(err);
          setIsSearching(false);
        });
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleCardClick = (movie) => {
    setSelectedMovie({
      ...movie,
      image: movie.image || (movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : 'https://via.placeholder.com/300x450?text=No+Image'),
      description: movie.overview || movie.description
    });
  };

  const onNavigate = (view) => {
    setActiveView(view);
    setSearchQuery('');
    window.scrollTo(0, 0);
    navigate(view === 'home' ? '/' : '/wishlist');
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} onNavigate={onNavigate} />

      <main>
        {activeView === 'wishlist' ? (
          <WishlistPage />
        ) : searchQuery ? (
          <section className="section container">
            <h2 className="section-title">Results for "{searchQuery}"</h2>
            {isSearching ? (
              <p className="loading-text">Searching...</p>
            ) : searchResults.length > 0 ? (
              <div className="trending-grid">
                {searchResults.map((movie) => (
                  <Card
                    key={movie.id}
                    {...movie}
                    rating={movie.vote_average?.toFixed(1) || 'N/A'}
                    image={movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : 'https://via.placeholder.com/300x450?text=No+Image'}
                    onClick={() => handleCardClick(movie)}
                  />
                ))}
              </div>
            ) : (
              <p className="loading-text">No results found for "{searchQuery}".</p>
            )}
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>Back to Home</button>
          </section>
        ) : (
          <>
            {heroMovie && (
              <Hero 
                movie={{
                  ...heroMovie,
                  title: heroMovie.title,
                  rating: heroMovie.vote_average.toFixed(1),
                  year: heroMovie.release_date?.split('-')[0],
                  image: 'https://image.tmdb.org/t/p/original' + heroMovie.backdrop_path,
                  description: heroMovie.overview
                }} 
              />
            )}

            <section className="section container">
              <Top10List movies={trendingMovies.map((m, index) => ({
                ...m,
                id: m.id,
                title: m.title,
                rating: m.vote_average.toFixed(1),
                image: 'https://image.tmdb.org/t/p/w500' + m.poster_path,
                rank: index + 1,
                onClick: () => handleCardClick(m)
              }))} />
            </section>

            <section className="section container">
              <h2 className="section-title">Exclusive Trailers <span>Watch the latest clips</span></h2>
              <div className="flex flex-wrap gap-6">
                <TralierBox 
                  title="The Batman"
                  subtitle="In his second year of fighting crime, Batman uncovers corruption in Gotham City."
                  duration="2:45"
                  image="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFhUXGBYXFxcVFxgYFxYXFxcXFxcXFRcYHSggGB0lHRcVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQFy0dHR0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS03LSstKy02Lf/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xABMEAABAwIEAgQICgcHAgcAAAABAAIDBBEFEiExQVEGBxNhIjVxc4GRk7EXMkJSU3KhssHiCBQjJdHh8DM0Q2KCktIkVBUWY3SUs8L/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAHxEBAQEAAwEAAgMAAAAAAAAAAAERAiExEmFxIkFR/9oADAMBAAIRAxEAPwDWdY/WDJRzCnp2ML8oe97wSG5icrWtBGul7nmFgputrExs6D2X5krrh8ZyfUi+6sJIFcG3j628T4ug9l+ZSm9a2IfOh9n+Zc+Y1O3SI3vwrYh86H2f5kXwrYh86H2f5lgsyW1UdAHWliHOH2f5kHdaWIfOh9n/ADWHjCfACDWy9aeItF7xez/mqs9cOKfOg9l+ZZSuluN9/wCrKqcFBv8A4YsU+dT+xP8AyQ+GHFPnU/sfzrAIKq3/AMMWKfOp/Y/nSj1w4nb40HsfzLnyCYN/8MOKfOp/Y/nQ+GLFPnQex/OsAEtkRKDefDDinzoPYn/knPhexT58Hsfzrn5YjCDe/DBinzoPYn/mgOuDFPnQey/MsPFTk9ylfqrWtuUGuHW/inzoPY/nT8PW5iXF0Poi/MsLFACdrDvUiipxI8NYBx14HmTyAUG7j61sRv4ToQ0b3jt+KmYb1mYlM4BojJc4MYBHrfdzjry4cFmsLwpjWOc6xGpva5sBpYcL2Wx6M0jWNFRJYFsbiGfRtdz5uOVxPKwHBBtOjeNVEjJDM9pLZHMblYG6NDbk78SVPqsVkaDYi/kCzfR9xbC258J5dI4X2dI4vsfJe3oSa+sNib/1/DVaxNU+OdYVZHKGMfGATY5mXsL68VRnrXxDMbOitmNv2ethffXyLPdIZrynylZ5zrZu9xH2lZG8pOtXEy1znPgsAbfsvlZSR8ruTUXW5iZNi6D2Xq+UslRSDJYgm3C9hch38vUouHMcfDGwDSftP/5KDsEvT2tzMDXxeGxjwOzvlJylwc6/LOeHyUxS9Y9a/My7A4F1v2Y2GbKLX/y6n+GtFQzERGV1iXMiLQdsobmfbkLBzdfnKHhlN2UtyQdBv5TY/YfWsSi5+FHEAdTEfJH/ADSx1oVxGjovZ/zWNrYhmdba59XBRbroN2/rQrx8qL2f80k9aOIfOh9n+ZYcm6QAUG/pOtaua4F7YXt4tylpI7nB2h9BXZcLrmzwxzM+LIxrxfezgDYry3mXo7oB4upPMs9ylVx7rh8ZyfUi+6sOStt1xeNJPNxfdWJVQAUsNRNCcagIMSgEsMTscaBsSDmikmAB1UzsByTLoA6/IIKafMTfgmJWEKzkiBF7bBV9YyxIUDKJGEYaqCIQQsggAUhkthx9QTLW6hSeyvsoB2o5n+vIlMkAPBEYQBvqnI6Uc7oEmqHC5RM7Rx+Lc8Adh6FMbBfQD8AO/vVpRUX28B/FFNUWEZheQ6NFyBo3nqRuVZzxNYywaGk2axoGjeZPfb3J5rvis3Grj/pta/pI9Saw8drK5xPgxgj0m5d9lgjS5wqDtHBlhlblceRdsxveNCbfVVmZPCdC0WzOzOcRtE3f/c4OHkJUXC3GOma+15ZrvYOJLtBe/ANtqpkTOyZ4Wr3WzO2vbgAOA4BakRKdWEbj+u5FObxlxPNQG3dvfc2UydhkaIRcX1d3NGw9J09BSnzjnGIxlzyTtqbqgi8K3Ilx9Z/n9i22MxOiZNfdrXG3kHFZKCF0dm8bMeP9tz6bEFYKciY5gcd9TGTbwd/BJN9L23TmBtzRubbwg46f6Tb3OVlAwsjdIY3GOzmONvBtmcATa97WOptoToqOnqDTzgW/ZlzH663aHBw8uxT2I6NUUA/UIDcBwYI3cNO1LOPc37FGq4crhcgk5zcaWbGMrR68yYx6se0CEOBPbPykcf8AqJHXtwsLlLraZ/hPcfByWb5CT/NJGVVijRe4Nwb+lVuRTJfijuJCjZVpTZak2TyCmhktXozoB4upPMs9y88OavRHQHxdSeZZ7kquPdcHjOT6kX3Viltet/xnJ9SL7qxzGqoS1qdaxOsjTrWIGmMT7QjARhqAZkprdLIgEtimwIqacWBGmov5Fm6q+a/M2WlxCN2XwfTdVNNQPklDLDTwjrbbvITRBqYcpsRbXbl3JMsJFidiLj+auKqicZHeDo2wdre5sLgczbgExiOHFjdSCeDW62B11PPuQVZboDzJHqt/FNuCflFmtHcT6ST+ACQ0IFQDVOueUulhul1EdkEXMSpNObniO/gFHYTewVm+hcGBxI1NvsugabV2uBdTsPxCx3VZTUb5G5mmMnMGBma0lzaxDOI1tfmmZopInua9paQbEHh3IsaOprxnuBY5SABxJI/kpUNS2Gkc3TO5jgPrm4ueQ1Ky1NUEvZxtz71fSsAgcTqSWg/7gRbkitxg7Gta18js0pa0XGjWNFmtYwchuTxS6qoEhAAOnv8A6uqqKuDrAD+gnoJw1pcTqbi34rUpiWahrRudB3fw1SqOpdG25JBcbnQegX8iopcRZmGbZvLclNz401wtfTkTqP68qVVf0mqMzJ7kklpBPlcBt6VGw+i7eVjL5TdrGk7BzQGDNyGlj5VB6Q1jTHIGnWwv/uCtOjFWxtYRI4NbI4uufilwBcAe64Z6u9Y5M1KoK8wwTU8rSLNErCbXIdZuo3LbdmQ4d299M/i2GjK0AkatIsBlyvaC4C3Fri30HuK6d1yxw9hAAxvaHK1rgBma1ozENPAHRc/qHvEOUtAe10Umlst7OLXBu4uCBy1IKkDrXOlayQgeCH/6XZjcepzj6UuSse4AOJ2t7/4lPwZG5S05gWNL28ngNEjdedyPRdMTw2JG9tL8+9bQ2CiKGVGiGCEYCdIQAUqmiF6F6CeL6XzTPcvPxavQXQXxfS+aZ7lkch622XxOT6kX3Vk2sWy61/GUn1IvurItatANalhqDWpwBUJQslhqW2ElLcDQCciBGyW2NSoIiSubXzTLgR4RAIGoF+PDgmsNppGCSYBpudQb3Nrk/aSPQrqGivYnht5VCxyvbFF2Y34qzWUSJ2UZwWC+rzmNy4m5I8HTyKJHi0Lbhwu0XDWtG4O9yb3/AJBZaaZ1t9E3HzK0uLGWMHUch7tftSWxJyF12o8qqH6cI6lqOEWVk2mDtLboM091rniplDjTmtyFrXtO4dwttZw1CnT4WCVHmwwBTtV1gOPw07u1FIHya2L5TZp5hoZqe8nimukOKGrJkeyFpGt2F2e2wabkhw+1UzKbhr61KnjY1th6Vbazk3Vd2BIvsOBTlLO5wy34gc+KZkqXWDQNOA/FWnRqkBkbfiSfTZRps8Jwpxizcd78lmcUxVzTlGx0B1+yy7D0XoWuYQ4bgj7LLh2MtyvcHEtGZxDrm4AuNOSLbiNV0NQ8Oc67cpsQ67SOGoOx8qg0ouCSWlwdlyeFnP8Amtly5e/NfuTsWNPje453uDibiR3aZu9xNrq2oMdpYXtlbAXvGpa95LL6G48Eced1cSovSDA6iFjXTwPja5pyv0c14FrXLSQ07b2Kt6HC+1c4Fu2Q67W0aQRvY5raK7lxuXE4KuWZuVkFNKYo2fEbdhLnOJsZHEtAFxZvK+qs8MwJz6mOFjTaWJri8C4jtNLmceDbNZoOLsnAFZ5M6oOlUk4nZTPcJOxbYHcx5gCQ91gXEaDXWyhTRhzA7TNnaAeYBt7mnRWvSCJjKmZsfxQ82O5PMuJ+MSb3PFVrY9RbYa/gPxUU0PBdfLvq4DjzI5qfVsvY82jXnYWv6QAfSo8w27ip1RJmY3S2UuHod4TfV4Q9SaK/s00QpTlHl3SWhKSjRK2gL0F0H8X0vmme5efV6B6DeL6XzTPcorlfWoP3jJ9SP7qyjY1qutSpDcRkHHJH91Yt+JWWrNE3InGx+hQI8YbxCj1mKk7JBaulY3imjijBsqAyk7pt6UaNmKs5J8Y00DRZNjgpLdlMhbVzN0qsLLO11cZDclHPDdMinVCXtuEQZwS7WSnm+yByg+MfIpbgo1ENSprVUCF2ytKaVVIGqmQycEWVcssRrv6U46mzgi2ijUpG6saTbTXyK/V1cV8mFbWFjyKq8SpSD+HJa2rNgOY+3+rLN4rJbdOUMU9PS6q8wd+V4PJwVVC5WeFjwh9Ye9Zg7H0WmLiBra9j376BZ3rI6HxBjpGiznE+S52F+C0PRE3y+VWvSyNr48htc3tz9BS9Us15aq6BwflynfgtP0W6LtncA52lrna+/AH089lfYz0dBde5Dhp5fSrXof8As3DMNtzY6jbybFC8am4rhbKeiZTxsy/rU8NNfcuD5QXizdvAY4nylap1c2mnrHfJipmEeUSTkD1yAKndKazFomgXhomdo7/NUTAiMEW+Sy7vSqfrWrHxTGNn+PE0P5hscmZo9Nz9qdWuc42dMeyQu1JuefNOtKj0o01UgLF9aKOqca+2nAixH2j7QP6KbQJQE5RZNyn5HqM5ICuk50klJzKhwuXoToL4vpfNM9y87516H6CeL6XzTPcg4d11ykYtIB9HD91Ypsp4ra9dfjaTzcP3SsNZaVJiN90lh1sjgkytIshHGXA2G2qIKUkJskp52oQjj0QMtapTRoiZFZG8oGiUnOgdSg8BA29IulPSVRKoOKsGhVtG+x8qsmlFEWJwa2RXRM2REymeRorvDJwLf16VRsdsrWiIAuUbi3xCqGQkamy5/XVRfKQeC2EslxYbLI4rTEPzN3UodhjuFcYPr6FmaTEg02fdbXCZGPbmFrWSE9dP6Da68rfao/WHXPifC8XyEuYfraOFvKA71IuiVW0ENa7yjy7lJ6w6ntoOzibcNcHFx5tvo31lL726WZYpqlnaWcOPPmnxEyGN87wQ1rcxtxy8BbcnQAd4S+jjM0bdNhqCOQ3A9ClPo3T1DIiP2MLhI8aftJhZ0TOZDBaR3eYu8LN5Jy6WXQigMEDpJvBllL6ic8A5+uW/JjQ1v+lcxx2vNVUOqDsXjKOTLdm0erKT6VquuLpF+rUjaZhtJUHwuYib8b1mw9a5XhdW48Vrj5rje2gkhsob6wA2JSv1okarP40SPCCEaYPRzm24VXhFVnaO5biLCm1FOHN+MPctfMrPLl8+so990y8oquMwylrtkHkcCpeKmnFFdCRqQsVTi9EdA/F1L5pnuXnQL0V0C8XUvmWe5IOIddfjaTzcP3Vh8wW267T+9pPNw/dUc1ND/wBLFlhv+pPklJipw3tf1GcjNN/aGTtchyn5QbxstKyQKnYZUBhN+LSPxWppaKkjrpZZm0zqM012hskLvC7GHNkja4ubJftSNAc3em8apKWMU0MBge5rJopp2dk+72vpz272v0e25laL/IuRsgoMHoxKXssRxa69rEfJ10Nwb2/y96cxqmEDgwA6A3cdnOub24Cwtp38d0/SVRYYwx/g9gywa6Joc8th7TKbhxcbyE59b3RYhWGTLqNYwWMcYuyM1ho7XwiGmSwfpmDRxssfy+vwvWKV9QmsxKcmqS2ORrxEHh8Q/s4Q4AslLspa3wdRHe23pUIVI5j1raJSCjNqBzTjZEQt6SjLkSoAKs6SW471WJUT8pBRVwUUW6Sx9wLJIRFlDGpER4filYfHnA5pFUws+L4SLEhr7aXTNRCHXNlDZiYGjwR6CftGilwYvCd3W9SjSHB0eErtt1ZU+DGKzGSb27/UrrBcRp82UvDS4H42mvDVTmYZmmBL25QNHXG/Ma6q50SVc9GMLELMxkc97hqSLBl+At5d1o6FgILC0Wtx9JOnpCqIIBlsHWvbUWOut/Wr3DorD0Wvb+Hl481zrVv+mKShDWuyN1OgHyRm4kcQN/s4qW4x00TnuNmMBLidz8pzieZJJPeSnY25czr6Gxv5ABp6brkPW70rc94oYjZos6W3Hi1v4lSTaxeTB9M8fdX1j5zcN+LG35rBt69/SkUD7KK2kUmJhC61F3SzA7qLjEQsozJbIVE9wiGOj1RZ2X1LofQ7Esj3RHZ232rl1I7LIFrqWqLXsf3i6S4c+OxddKIGTAnZwP4rITQyM7wtbiszTYg76qtkeHK3tOEyKuGqBGu6UWpU9ONwmg/gsqdaV6K6B+LqXzTPcvOjXL0X0D8XUvmme5TMVwnrxP72l81D90rqHVl0dppMNpnviY5xjaSS0XOi5f15eNpfNQ/dK7L1T+K6XzbPcg5h184XDA+mETGsv2l7AC9snJcokOhXpHrU6BS4kYTHKGdnnvdpdfNl7xbb7VgvgOqjp+sM9mf+aDp/RLozSvo4HOhYSY2EnKNfBHcuQ9emHRw1kTYmBoMZJAAHyl6BwGhMFPHETcsa1pPOwAuuEfpB/wB+h80fvINH1GYJBNROdLG1x7R4uQDpcLosvRiiaLuhjA72j+CxX6Pv9wd51/vCd6/z+7gOHax+9BqndFMPlFuxicPqtP4LKdJup6llaXU47F/DL8X0s29Vlw3o90gqKKRskEjm2Nyy5yPHEObtrz3XrDo/iQqaeKdu0jGuH+oA/ig8nYth0tNM+CYWew2PIjg5vMFMBdT/AEg8Oa2WnnAsXBzHd9rObfyeF61yphWkKQKCCB+mmymx2U9VKmUs/A8NkFzQTkXClF1xdVUep0urCK5RfDErdU7Hh8b7B1h9o/iOCmMoCddQlHDHjUX05Iso39DQG3bLYXFg0m2rg0WB04+hTY+hkryGtnAAsDcjfiR4JJFiqOrmmbo0GxtqSd/UrvAMRkvle9w1HySbjfcFXp148pGtwTq8MYBNfPmuPAYAGgXF7hzfRsrbsqgTFrpXSMHxbgC3O4AUvDZ2tYHDcjc78+em4VT0u6RihpzK8DO82hZrdxsdTyAXP2uPPnqN1h9MW0cQiY4GZws0bkc3u8i4i0Oe8vcSXOJJJ3JKarKuSeQzSuLnk3JPuHcrGBoW50ZhyNiKQJwFG8IiJKoTyp0oUGYKCODqCtAHeB6FnitBSxlzBYcEWpInJYDdNtnITppiAAmOzVxDzZbpt8eqNrVK7PRQRmNuvRvQQfu+l80z3Lz7FGV6E6ED/oKbzTfclI4P15eNpfNQ/dK7L1T+K6XzbPcuM9eXjaXzUP3Suv8AVVWRjDKYF4B7NvHuUUXWL1gNwwxAwulMmbYgWy5d7+X7FjPh6b/2b/8Ae1Q/0hJmvfS5SDbtNvIxchezQ+RB7IwiuE8McoFg9rXW5XANvtXBf0g/79D5o/eXZOhtWwUVOC8D9mzj/lC411+SB1bCWkEdkdvrINr+j7/cH+df7wl9f/i8edj96Y6hKhjaFwc4A9q/fyhdDxOGmnZkmyPbvZ1iL87FB5HwzD5KmRsMLS57jYW2He48AOa9bdF8N/V6WGH5jGt/2gD8FFoqShptWCJnksPcs30v61qSma5sLhPNYgNYbtB/zvGjff3IMX+kHibXT08ANywOkd3X8Fvr8L1LlkYUjEq+SpmfPM7NI83J4DkAOAAsAEhkeisCCEEogpJYtfpBIA2SXJJUqrSlnurqjlFgVlInlqtqGtG3rCI19BVcLenlyVsxt2bnTcgabeXyrK4fPc8u8rQRVIDcpttY2TWp4tMOhifofw1VnB0fibICNLmwBO/k79vUqHDJdRbgQtXFiDGszyODQ0G5JGoHyrqVKmYgIKeJ08rg1jBmcSd7bAczra3evPPSnHpK6pdM82G0bL6MZwHl5rRdY3TJ1a4RRkiBm3AyO+c4e4elYuGNTxJP7TYorhS6b4qFG3RFHuR3rS0+0onv4I3aJAKIYkUWdTnqFUhSiIVvMKyiBhssA93ctjgspdTgDgtcfVqcx4cT70J6ZpUWkqMhNxupPb5ltEZ0CkxN8FIegySwUEumj7l3boi21FTjlG1cFoqoXXe+iZvRwH/02rPJmeuG9b1HFLjEwlqWU4EMJDnskeHG2wEbSRz1VBXdEo4GwukxWFrZo+1itHVeEy9r2DPB1B0NirPryH72l81D90qu6dD/AKfCf/Yt/wDscstoUHRtppYKqorY4WzOlbG17J5HXidld/ZtNuHrSa3o7kpjVQ1ENTC17WSGMSMdE53xM8cjQbHYEcVf1FXTx4Phvb0oqLyVuW80kWS0rb/E+NfTfayZxmdj8JL6CEQQmdjKyHM+WQyAEwvMrybxHYNAbZ3O6Cr6LdGaitbI6OVrAyzWB7nDtpXNe9sMdvlFrHH1c1W4Nh76qohpw6z5XiMF9yGk/O4rZ4o2noo6OjdUzQ1FM4VU3ZQCUfrUgY9uZ3aN1YwNba2xUh9FH/45h9XT/wB3rZWzx6WyvzWnYRc2IfrbhnUGMgwWUxVkokAbRuia8AuBeZZXRAstoLFt9eChUcUkkkcYe4GR7GAlzrAvcGgnu1WuwuFz6PHWsa5zu1pLBoJJtVyE2A12WfwemlZVUueKRgNRAAXsc0E9o02BcN9D6kE/E+jMEUj4ZsVgD43Fj2mGqdZzTYi4YQdeSjYP0cbPLUMZVRCKniMzpiyXI5jS0EtZlz7u2twWg6ZzN/X6v9zsl/byftCa39p4R8LwJA3XuACZ6Avax+Kukp8rBQzONOTIyzS+M5A5xLwLcSSVRAw3ozHUP7Kmr6eaYglkRjniMhAJLWOkYGl1gdCVRRvOoNxbQg8OBBW26FVlNJM5tJRspq7I80sr5pZ2doGElmR5ADy3NlccwB4LDw31Jvfjfe/G/fdNDtkVkdkVlqVDbwkZU84IMG4UobRlg3vZEgoJMNTI3Z3rCmDF5e71H+Kq8pRh5CC2d0nnZ8Vre8G5B+1NVeNT1LLSPJA+SNB/NQQ8HdSMMpwXlo4i9u8IqC9uhsm6NutlZvpdUigoSXIacj0RfKurp+HjLdVdTFleArYhDnogUqVutkiyAFMSxp4tumyEFbUx2VtgVeWtLVCq26JOG7lSKtZJyUdPVlu6bc1NvYrtRbiqugZbqmbIQpUUt1r60SRNYr0b0GdfD6U84me5eaHuXpPq+P7tpPMs9yzyVjetbq1mrpm1VK5naZAySOQ5Q4Nvlcx1jrrYg8h6cFL1TYw4ND2scGDKwOqMwY298rAfii/AaI0FNAd1TYwWtYWsLG3LWGcFrS7Vxa06NvxtujZ1UYy0OawNY12UuDajKHFhzMzAb5TqL7HUIIIDf1S4s9xfI1j3uN3OdOHOcebnHUnypxvVbjLcgacojcXxhtSQI3ndzAD4Lu8WKCCgXRdWONQlxheYy/45jqiwv3N3FpGbc78ylVfVxj0oaJZXSBrg9okq3OyvGzm5ibOFzqNdUEEEj/yL0i/7mb/50n/JRXdWGMuc973ZnSDLI41JLpG6DLI4m726DQ3GgRoK6BD1U4owhzGsa5pu1zZg1zTzDhqD3hI+CXEySSyMkkkkzAkk6kknUm/FBBNAHVPig2ji9q1A9U+KH/Di9q1BBX6BfBNif0cXtWovglxP6OL2rUEFPoId1R4p9FF7VqL4I8U+ii9s1GgmgfBJiv0cXtmovgkxX6KL2zUEE0F8EeKfRRe2ap2CdVeJRy53xx2tYWlaSjQTQ/J1Y4iT/Zx7/SMTXwYYmNo4/atRoJ9AvgyxX5kftWpt3VZiZeCY49B9K1EgpoW/qsxI/wCHH7VqB6rMSt/Zx+1aggrobPVVif0cftWpPwUYn9HF7VqCCaETdUuJkf2cXtWpuk6o8Ua65jit3TNQQTRPd1W4l9HH7VqT8FeJfRx+1aggmhl3VRif0cXtWpLeqjFB/hxe1aggmiVSdU2IvcA8QxtO7jJmsOYa0XJ7tPKu54Rh7aeCKBl8sTGsBO5DQBc95siQUH//2Q=="
                  likes="12k"
                  reactions="4k"
                />
                <TralierBox 
                  title="Spider-Man: Across the Spider-Verse"
                  subtitle="Miles Morales catapulted across the Multiverse, where he encounters a team of Spider-People."
                  duration="3:12"
                  image="data:image/jpeg;base64,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"
                  likes="45k"
                  reactions="15k"
                />
              </div>
            </section>
            
            <section className="section section-alt">
              <div className="container">
                <h2 className="section-title">Trending Today <span>Movies popular right now</span></h2>
                <div className="trending-grid">
                  {topRatedMovies.map((movie) => (
                    <Card
                      key={movie.id}
                      {...movie}
                      rating={movie.vote_average.toFixed(1)}
                      image={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
                      genres={["Popular", "Trending"]}
                      onClick={() => handleCardClick(movie)}
                    />
                  ))}
                </div>
              </div>
            </section>

            <section className="section container">
               <div className="side-by-side-clean">
                  <div className="box-office-wrapper">
                    <TopBoxOffice data={[
                      { id: 1, title: "Dune: Part Two", gross: "$711M" },
                      { id: 2, title: "Kung Fu Panda 4", gross: "$541M" },
                      { id: 3, title: "Godzilla x Kong", gross: "$567M" },
                      { id: 4, title: "Civil War", gross: "$122M" },
                      { id: 5, title: "The Fall Guy", gross: "$170M" }
                    ]} />
                  </div>
                  <div className="news-wrapper">
                    <div className="section-title">Latest News <span>Around the industry</span></div>
                    <div style={{color: '#999', padding: '20px'}}>Fetching industry news...</div>
                  </div>
               </div>
            </section>
          </>
        )}
      </main>

      <Footer />

      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}

      <style>{`
        .side-by-side-clean {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
        }
        @media (max-width: 1024px) {
          .side-by-side-clean { grid-template-columns: 1fr; }
        }
        .clear-search-btn {
          margin-top: 30px;
          background: #333;
          color: #fff;
          border: 1px solid #444;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.2s;
        }
        .clear-search-btn:hover { background: #444; }
      `}</style>
    </div>
  );
}

export default App;
