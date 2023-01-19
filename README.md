# 02.Proyecto-presupuesto-React
Es una app, mediante la cual podemos crear un presupuesto.

El proyecto consiste en hacer un control de presuspuesto. En inicio debemos colocar el monto de nuestros ingresos para poder llevar a cabo el presupuesto, si la cifra es valida entonces pasamos a un nuevo componente donde podremos presupuestar nuestros gastos. En esta nueva seccion tendremos la oportunidad de añadir nuestros gastos, cada vez que añadamos un gasto se actualizara el dinero disponible con el que contamos, el dinero gastado (que tambien se vera representado en porcentaje) y ademas tendremos un boton para resetear nuestro presupuesto e iniciar de cero. Ademas cada nuevo gasto tendra la posibilidad de ser editado y eliminado, pero no se contara con un boton, sino que tendremos que hacer arrastrar a la izquierda o derecha

Para estre proyecto se hace uso de los hooks useState y useEffect, para hacer el grafico que muestra lo gastado se hizo uso del "CircularProgressbar" de React. Para poder eliminar y/o editar el gasto arrastrandolo hicimos uso de los siguientes componentes de React: LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions.
