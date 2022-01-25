import React from 'react'
import { Dimmer, Loader} from 'semantic-ui-react'

const MyLoader = (props) => {
    const { text = 'Cargando' } = props

    return (
        <Dimmer active>
            <Loader>{text}</Loader>
        </Dimmer>
    );
}
 
export default MyLoader;