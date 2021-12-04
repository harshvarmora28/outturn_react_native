import React from 'react'
import { View, Text } from 'react-native'
import { 
    ChartDot,
    ChartPath,
    ChartPathProvider,
    ChartXLabel,
    ChartYLabel,
    monotoneCubicInterpolation
} from "@rainbow-me/animated-charts"
import { SIZES, COLORS, FONTS } from '../constants'
import moment from 'moment'

const Chart = ({ containerStyle, chartPrices }) => {

    // Points
    let startUnixTimestamp = moment().subtract(7, "day").unix()

    let data = chartPrices ? chartPrices?.map((item, index) => {
        return {
            x: startUnixTimestamp + (index + 1) * 3600,
            y: item
        }
    }) : []

    let points = monotoneCubicInterpolation({ data, range: 40 })

    const formatINR = value => {
        "worklet";

        if(value === ""){
            return "";
        }

        return `₹${Number(value).toFixed(2)}`
    }

    const formatDateTime = value => {
        "worklet";

        if(value === ""){
            return "";
        }

        var selectedDate = new Date(value * 1000);

        let date = `0${selectedDate.getDate()}`.slice(-2)
        let month = `0${selectedDate.getMonth() + 1}`.slice(-2)
    
        return `${date} / ${month}`
    }

    return (
        <View
        style={{
            ...containerStyle
        }}
        >
            {/* Chart */}
            {
                data.length > 0 &&
                <ChartPathProvider
                data={{
                    points,
                    smoothingStrategy: "bezier"
                }}
                >
                    <ChartPath
                    height={150}
                    width={SIZES.width}
                    stroke={COLORS.lightGreen}
                    strokeWidth={2}
                    />

                    <ChartDot>
                        <View
                        style={{
                            position: "absolute",
                            left: -35,
                            width: 80,
                            alignItems: "center",
                            borderRadius: 20,
                            backgroundColor: COLORS.transparentBlack
                        }}
                        >
                            {/* Dot */}
                            <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                width: 25,
                                height: 25,
                                borderRadius: 15, 
                                backgroundColor: COLORS.white
                            }}
                            >
                                <View
                                style={{
                                    width: 15,
                                    height: 15, 
                                    borderRadius: 10,
                                    backgroundColor: COLORS.lightGreen
                                }}
                                >
                                </View>
                            </View>

                            {/* Y-Label */}
                            <ChartYLabel
                            format={formatINR}
                            style={{
                                color: COLORS.white,
                                ...FONTS.body5
                            }}
                            />

                            {/* X-Label */}
                            <ChartXLabel
                            format={formatDateTime}
                            style={{
                                marginTop: 3,
                                color: COLORS.lightGray3,
                                ...FONTS.body5,
                                lineHeight: 15
                            }}
                            />
                        </View>
                    </ChartDot>
                </ChartPathProvider>
            }
        </View>
    )
}

export default Chart

