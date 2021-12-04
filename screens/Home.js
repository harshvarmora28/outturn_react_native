import React from "react";
import { View, Text } from "react-native";
import { MainLayout } from ".";
import { connect } from "react-redux";
import { getHoldings, getCoinMarket } from "../stores/market/marketActions";
// import { holdings } from "../constants/dummy";
import { useFocusEffect } from "@react-navigation/native";
import { SIZES, COLORS, FONTS, dummyData, icons} from "../constants";
import { BalanceInfo } from "../components";

const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {

  useFocusEffect(
    React.useCallback(() => {
      getHoldings(holdings = dummyData.holdings)
      getCoinMarket()
    }, [])
  )

    function renderWalletInfoSection() {
      return (
        <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25, 
          backgroundColor: COLORS.gray
        }}
        >
          {/* Balance Info */}
          <BalanceInfo
          title="Your Wallet"
          displayAmount="68,000"
          changePct="3.46"
          containerStyle={{
            marginTop: 50
          }}
          />

          {/* Buttons */}
        </View>
      )
    }

  return (
    <MainLayout>
      <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black
      }}
      >
        {/* Header - Wallet Info */}
        {renderWalletInfoSection()}

        {/* Chart */}

        {/* Top Cryptocurrency */}
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => { return dispatch(getHoldings(holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page))},
    getCoinMarket: (currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => { return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page))}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
