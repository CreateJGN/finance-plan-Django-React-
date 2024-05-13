import "./market-view.styles.scss"
import MarketDataSearch from "./market-data-search/market-data-search.component"
import MarketDataGraph from "./market-data-graph/market-data-graph.component"

import { useContext, useEffect } from "react"
import { MarketDataContext } from "../../../contexts/shared/market-data/market-data.context"
import { DEFAULT_MARKET_DATA } from "../../../utils/constants/market-data.constants"

const MarketView = () => {
  const { marketData } = useContext(MarketDataContext)

  return (
    <div className="market-view-container">
      <h3>Search Market Data</h3>
      <MarketDataSearch></MarketDataSearch>
      {
        marketData !== DEFAULT_MARKET_DATA && marketData.queryResults !== undefined && <MarketDataGraph></MarketDataGraph>
      }
    </div>
  )
}

export default MarketView