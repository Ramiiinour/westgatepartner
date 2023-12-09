import React from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete'

declare const window: any

export class LocationSearchInput extends React.Component<any, any> {
    mapAdded: any
    constructor(props: any) {
        super(props)
        this.state = { address: '', loaded: false }
    }

    componentDidMount() {
        if (!this.mapAdded) {
            this.mapAdded = true

            window.initMap = this.initMap.bind(this)
            const gmapScriptEl = document.createElement(`script`)
            gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCbW7sUOtCHtwO_QhbEsp8hjmlDwERkMWE&libraries=places&callback=initMap`
            document
                .querySelector(`body`)
                ?.insertAdjacentElement(`beforeend`, gmapScriptEl)
        }
    }

    initMap = () => {
        this.setState({
            gmapsLoaded: true,
            loaded: true,
        })
    }

    handleChange = (address: any) => {
        this.setState({ address })
    }

    handleSelect = (address: any) => {
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                this.props.setLng(latLng.lng)
                this.props.setLat(latLng.lat)
                console.log(latLng)
            })
            .catch((error) => console.error('Error', error))
    }

    render() {
        return (
            <>
                {this.state.loaded && (
                    <>
                        <PlacesAutocomplete
                            value={this.state.address}
                            onChange={this.handleChange}
                            onSelect={this.handleSelect}
                        >
                            {({
                                getInputProps,
                                suggestions,
                                getSuggestionItemProps,
                                loading,
                            }) => (
                                <div>
                                    <input
                                        {...getInputProps({
                                            placeholder: 'Search Places ...',
                                            className:
                                                'location-search-input form-control',
                                        })}
                                    />
                                    <div className="autocomplete-dropdown-container">
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map((suggestion) => {
                                            const className = suggestion.active
                                                ? 'suggestion-item--active'
                                                : 'suggestion-item'
                                            const style = suggestion.active
                                                ? {
                                                      backgroundColor:
                                                          '#fafafa',
                                                      cursor: 'pointer',
                                                  }
                                                : {
                                                      backgroundColor:
                                                          '#ffffff',
                                                      cursor: 'pointer',
                                                  }
                                            return (
                                                <div
                                                    {...getSuggestionItemProps(
                                                        suggestion,
                                                        {
                                                            className,
                                                            style,
                                                        }
                                                    )}
                                                >
                                                    <span>
                                                        {suggestion.description}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                        <div id="map"></div>
                    </>
                )}
            </>
        )
    }
    static defaultProps = {
        center: {
            lat: 25.2048,
            lng: 55.2708,
        },
        zoom: 13,
    }
}
