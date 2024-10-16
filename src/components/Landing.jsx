
const Landing = () => {
    return(
        <div className="flex flex-col w-4/5 md:w-1/2 xl:w-3/5 2xl:w-3/6 3xl:w-1/3 mx-auto mt-10 p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
            <div className="flex flex-row gap-3 pb-4">
                <img className="mx-auto mb-2" src="https://res.cloudinary.com/dskio3msp/image/upload/v1727733258/new_logoVozFlex_b6noq1.png" alt="La Voz Flex" width="200" />
            </div>
                <h1 className="sm:text-3xl text-lg font-bold my-2 text-center">¡Te gusta cantar y tienes habilidades para interpretar melodías!</h1>
                <p className="sm:text-xl text-base font-semibold text-center">Te invitamos a participar en nuestra primera edición de</p>
                <h2 className="sm:text-3xl text-2xl font-bold text-blue-700 text-center my-6">La Voz Flex</h2>
                <h2 className="sm:text-5xl text-3xl text-center font-light">CONVOCATORIA</h2>
                <p className="sm:text-xl text-base font-semibold text-center mt-4">Podrán participar todos los <span className="text-blue-700 font-bold">empleados de Flex San Luis</span> con la oportunidad de ganar hasta <span className="text-blue-700 font-bold">$15,000 pesos en efectivo.</span></p>
            <div className="sm:text-xl text-base font font-semibold mt-5">
                <h2 className="sm:text-2xl text-xl text-center text-blue-700 font-bold my-5">Bases del concurso:</h2>
                <p>Los interesados deberán incribirse en el área de entrenamiento con <span className="text-blue-700 font-bold">Elga Aguilar</span> o al correo electronico: <span className="text-blue-700 font-bold">elga.aguilar@flex.com</span> con su número de empleado, nombre completo, área y horario de trabajo y enviar un video corto demostrando tu talento para el canto vía <span className="text-blue-700 font-bold">WhatsApp al: 653-130-6117</span> como primer filtro para la etapa de audiciones.</p>
                <ul className="list-disc mt-5">
                    <li>El periodo de inscripción y recepcion de videos se llevará a cabo <span className="text-blue-700 font-bold">del 9 al 20 de octubre.</span></li>
                    <li>El video no debe de exceder de un minuto y medio y las canciones deberán evitar temas alusivos a la violencia de genero y narcocorridos.</li>
                    <li>Los participantes podrán elegir libremente el género de cancion:Ranchero, trova, bolero, balada, rock, cumbia, jazz, folklor, entre otros.</li>
                    <li>Los seleccionados para la etapa de audiciones se darán a conocer por medio de tu representante de RH el dia <span className="text-blue-700 font-bold">24 de octubre.</span></li>
                    <li>Las audiciones se llevarán a cabo del <span className="text-blue-700 font-bold">28 al 30 de octubre</span> en Sala Diaz.</li>
                    <li>Los participantes se darán a conocer el dia <span className="text-blue-700 font-bold">31 de octubre</span> a través de las pantallas.</li>
                </ul>
                <h2 className="sm:text-2xl text-xl text-center my-5 text-blue-700 font-bold ">Etapas del concurso:</h2>
                <p>Las presentaciones de los participantes se llevaran a cabo los miércoles en el comedor del Edificio B1 y podras disfrutarlas nuevamente a través de las pantallas durante la semana en curso.</p>
                <ul className="list-disc mt-5 font-bold text-blue-700">
                    <li>Audiciones.- <span className="font-medium text-gray-600">del 28 al 30 de octubre</span></li>
                    <li>Primera presentación.- <span className="font-medium text-gray-600">6 de noviembre</span></li>
                    <li>Presentaciones y primera ronda de eliminación.- <span className="font-medium text-gray-600">13 de noviembre</span></li>
                    <li>Presentaciones y segunda ronda de eliminación.- <span className="font-medium text-gray-600">20 de noviembre</span></li>
                    <li>Presentaciones y tercera ronda de eliminación.- <span className="font-medium text-gray-600">27 de noviembre</span></li>
                    <li>Semifinal.- <span className="font-medium text-gray-600">4 de diciembre</span></li>
                    <li>¡Gran Final! y premiación de los 3 primeros lugares.- <span className="font-medium text-gray-600">11 de diciembre</span></li>
                </ul>
            </div>
        </div>
    );
};

export default Landing;