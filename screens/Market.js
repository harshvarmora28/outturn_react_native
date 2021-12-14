import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Animated,
    Image
} from 'react-native';
import { MainLayout } from '.';
import { connect } from "react-redux"
import { getCoinMarket } from '../stores/market/marketActions';
import { constants, COLORS, FONTS, SIZES, icons } from '../constants';
import { HeaderBar } from '../components';
import { TextButton } from '../components';
import { LineChart } from 'react-native-chart-kit';

const marketTabs = constants.marketTabs.map((marketTab) => ({
    ...marketTab,
    ref: React.createRef()
}))

const Tabs = () => {
    return(
        <View
        style={{
            flexDirection: "row"
        }}
        >
            {/* Tabs */}
            {marketTabs.map((item, index) => {
                return(
                    <TouchableOpacity
                    key={`MarketTab-${index}`}
                    style={{
                        flex: 1
                    }}
                    // on press
                    >
                        <View
                        ref={item.ref}
                        style={{
                            paddingHorizontal: 15,
                            alignItems: "center",
                            justifyContent: "center",
                            height:40
                        }}
                        >
                            <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.h3
                            }}
                            >{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const Market = ({ getCoinMarket, coins }) => {

    const scrollX = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        getCoinMarket()
    }, []);

    function renderTabBar(){
        return (
            <View
            style={{
                marginTop: SIZES.radius,
                marginHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.gray
            }}
            >
                <Tabs/>
            </View>
        )
    }

    function renderButtons(){
        return(
            <View
            style={{
                flexDirection: "row",
                marginTop: SIZES.radius,
                marginHorizontal: SIZES.radius
            }}
            >
                <TextButton
                label="INR"
                />
                <TextButton
                containerStyle={{
                    marginLeft: SIZES.base
                }}
                label="% (7d)"
                />
                <TextButton
                containerStyle={{
                    marginLeft: SIZES.base
                }}
                label="Top"
                />
            </View>
        )
    }

    function renderList(){
        return(
            <Animated.FlatList
                data={marketTabs}
                contentContainerStyle={{
                    marginTop: SIZES.padding
                }}
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                onScroll={
                    Animated.event([
                        {nativeEvent: {contentOffset: {x: scrollX}}}
                    ], {
                        useNativeDriver: false
                    })
                }
                renderItem={({item, index}) => {
                    return(
                        <View
                        style={{
                            flex: 1,
                            width: SIZES.width
                        }}
                        >
                            <FlatList
                            data={coins}
                            keyExtractor={item => item.id}
                            renderItem={({item, index}) => {
                                return(
                                    <View
                                    style={{
                                        flexDirection: "row",
                                        paddingHorizontal: SIZES.padding,
                                        marginBottom: SIZES.radius
                                    }}
                                    >
                                        
                                    </View>
                                )
                            }}
                            />
                        </View>
                    )
                }}
            />
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
            {/* Header Bar */}
            <HeaderBar
            title="Market"
            />

            {/* Tab Bar */}
            {renderTabBar()}

            {/* Buttons */}
            {renderButtons()}

            {/* Market List */}
            {renderList()}

        </View>
        </MainLayout>
    )
}

function mapStateToProps(state) {
    return {
      coins: state.marketReducer.coins
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getCoinMarket: (currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => { return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page))}
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Market);