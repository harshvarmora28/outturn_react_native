import React from "react";
import { View, Text } from "react-native";
import { MainLayout } from ".";
import { connect } from "react-redux";
import { getHoldings, getCoinMarket } from "../stores/market/marketActions";
// import { holdings } from "../constants/dummy";
import { useFocusEffect } from "@react-navigation/native";
import { SIZES, COLORS, FONTS, dummyData, icons} from "../constants";


const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {

  useFocusEffect(
    React.useCallback(() => {
      getHoldings(holdings = dummyData.holdings)
      getCoinMarket()
    }, [])
  )

  return (
    <MainLayout>
      <View>
        <Text>Home</Text>
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
